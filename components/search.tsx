import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import React from "react";
import Form from "next/form";
import { cn } from "~/lib/utils";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  searchParams?: string;
  className?: string;
}

export default function SearchInput({
  searchTerm,
  setSearchTerm,
  placeholder,
  searchParams,
  className,
}: SearchProps) {
  return (
    <div className="flex items-center space-x-2 w-full bg-card  shadow-none rounded-md">
      <Form action={""} className="relative w-full">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          name={searchParams}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn("pl-8", className)}
        />
      </Form>
    </div>
  );
}
