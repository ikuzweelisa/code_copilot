"use client"
import { AlertCircle } from "lucide-react";

export default function ErrorMessage() {
  return (
    <div>
      <span className=" text-red-500 flex items-center gap-2">
        {" "}
        <AlertCircle /> Unable to generate response. Please try again.{" "}
      </span>{" "}
    </div>
  );
}
