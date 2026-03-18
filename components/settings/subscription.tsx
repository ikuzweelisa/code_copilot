import { CreditCard, Download } from "lucide-react";

import { customer } from "~/lib/auth/auth-client";

import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function Subscription() {
  const MOCK_INVOICES = [
    { id: "INV-001", date: "Dec 12, 2025", amount: "$12.00", status: "Paid" },
    { id: "INV-002", date: "Nov 12, 2025", amount: "$12.00", status: "Paid" },
  ];
  customer.state().then(s=>console.log(s))
  return (
    <div className="space-y-2">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Upgrade Your Plan</h2>
          <p className="text-sm text-muted-foreground">Subscribe to unlock all features</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => customer.portal()}
            variant="outline"
            className="space-x-2 border-border bg-transparent"
          >
            <CreditCard className="h-4 w-4" />
            <span>Upgrade Now</span>
          </Button>
        </div>
      </section>

      <div className="h-px w-full bg-border" />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Billing History</h2>
        {MOCK_INVOICES.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-medium">Invoice ID</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="text-right font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_INVOICES.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.amount}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500">
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download invoice</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-20 text-muted-foreground">
            <p>No invoices found</p>
          </div>
        )}
      </section>
    </div>
  );
}
