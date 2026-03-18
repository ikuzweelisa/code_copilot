"use client"
import { Check } from "lucide-react";

import { Button } from "./button";
import {checkout} from "~/lib/auth/auth-client"
export function PricingCard({
  slug,
  price,
  period = "",
  features,
  description,
  isPopular = false,
}: {
  slug: string;
  price: string;
  period?: string;
  features: string[];
  description: string;
  isPopular?: boolean;
}) {
  const handleCheckOut=()=>{
    checkout({
       slug
    })
  }
  const title = slug.replaceAll("-"," ");
  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-card p-8 ${
        isPopular ? "border-blue-500 shadow-xl ring-1 ring-blue-500" : "hover:shadow-lg"
      } transition-all duration-300`}
    >
      {isPopular && (
        <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
          Most Popular
        </span>
      )}
      <div className="mb-8">
        <h3 className="mb-2 text-lg font-semibold capitalize">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full capitalize ${isPopular ? "" : "variant-outline"}`}
        variant={isPopular ? "default" : "outline"}
         onClick={handleCheckOut}
      >
        Choose {title}
      </Button>
    </div>
  );
}

