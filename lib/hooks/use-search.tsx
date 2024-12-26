import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

/**
 * useSearch is a custom hook that will filter the items based on a search query
 * and save the query in the URL.
 *
 * @param items the items to be filtered
 * @param predicate a function that takes the item and the search query and
 * @param options an object containing options for the debounce and searchParams
 * returns a boolean indicating whether the item should be filtered or not
 * @returns an array containing the current search query, a function to update
 * the search query, and the filtered items
 */
function useSearch<T>(
  items: T[],
  predicate: (item: T, query: string) => boolean,
  options?: { debounce?: number; searchParams?: string }
): [string, React.Dispatch<React.SetStateAction<string>>, T[]] {
  const params = useSearchParams();
  const [filtered, setFiltered] = useState(items);
  const [query, setQuery] = useState(() => {
    return params.get(options?.searchParams || "query") || "";
  });
  const pathname = usePathname();
  const router = useRouter();
  const search = useDebouncedCallback(() => {
    const searchParams = new URLSearchParams(params);
    if (query.trim() === "") {
      searchParams.delete("query");
      setFiltered(items);
      router.replace(`${pathname}`);
      return;
    }
    const newItems: T[] = [];
    for (const item of items) {
      if (predicate(item, query.toLocaleLowerCase())) {
        newItems.push(item);
      }
    }
    setFiltered(newItems);
    searchParams.set(options?.searchParams || "query", query);
    router.replace(`${pathname}?${searchParams.toString()}`);
  }, options?.debounce || 200);

  useEffect(() => {
    search();
  }, [query, search]);

  return [query, setQuery, filtered];
}

export default useSearch;