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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Bestsellers({ data }) {
  console.log("data", data);
  return (
    <Card>
      <CardHeader><CardTitle>Bestsellers</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent bestsellers products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((value, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {value.product.name}
                  </TableCell>
                  <TableCell>{value.revenue}</TableCell>
                  <TableCell>{value.units}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
