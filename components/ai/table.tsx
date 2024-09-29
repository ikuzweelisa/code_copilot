"use client";
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
import ButtonRow from "@/components/ai/button-row";

export default function DisplayTable({
  title,
  itemNames,
  overview,
  comparison,
  message,
}: TableProps) {
  return (
    <div className=" flex flex-col gap-5">
      <span className="text-foreground">{message}</span>
      <Table className="w-full  border-x-border border-2  rounded-md overflow-hidden">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="dark:text-zinc-100  font-medium">
              Feature
            </TableHead>
            {itemNames.map((item, index) => (
              <TableHead
                key={index}
                className=" dark:text-zinc-100  font-medium"
              >
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {comparison.map((compare, index) => (
            <TableRow key={index} className="border-t border-border">
              <TableCell className="font-medium">{compare.feature}</TableCell>
              {compare.items.map((item, index) => (
                <TableCell key={index}>{item}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>{title}</TableCaption>
      </Table>
      <span>{overview}</span>
      <ButtonRow />
    </div>
  );
}
