import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableProps } from "@/lib/types";

export default function DisplayTable({
  title,
  itemNames,
  overview,
  comparison,
  message,
}: TableProps) {
  return (
    <div className="p-1 flex flex-col gap-4  rounded-lg">
      <span>{message}</span>
      <Table className={"rounded-md w-full"}>
        <TableHeader className=" py-1 bg-zinc-800 text-zinc-100">
          <TableRow>
            <TableHead className="text-zinc-300">Feature</TableHead>
            {itemNames.map((item, index) => (
              <TableHead key={index} className="text-zinc-300">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="w-full font-sans bg-zinc-950 rounded-md overflow-hidden">
          {comparison.map((compare, index) => (
            <TableRow key={index}>
              <TableCell className="text-zinc-300">{compare.feature}</TableCell>
              {compare.items.map((item, index) => (
                <TableCell key={index} className="text-zinc-300">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>{title}</TableCaption>
      </Table>
      <span>{overview}</span>
    </div>
  );
}