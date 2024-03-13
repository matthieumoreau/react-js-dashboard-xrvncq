"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Bestsellers({ data }) {
  console.log("data", data);
  return (
    <div>
      <h2 className="text-xl">Bestsellers</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((value, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{value.product.name}</TableCell>
                <TableCell>{value.revenue}</TableCell>
                <TableCell>{value.units}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
