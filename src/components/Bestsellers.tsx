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

  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Bestsellers({ data }) {
    let CADollar = new Intl.NumberFormat('fr-CA', {
        style: 'currency',
        currency: 'CAD',
    });

    let CANumberFormat = new Intl.NumberFormat('fr-CA');


  return (
    <Card>
      <CardHeader><CardTitle>Bestsellers</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent bestsellers products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead># Units Sold</TableHead>
              <TableHead>Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((value, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {value.product.name}
                  </TableCell>
                  <TableCell>{CANumberFormat.format(value.units)}</TableCell>
                  <TableCell>{CADollar.format(value.revenue)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
