"use client";

import { Badge } from "@/components/ui/badge"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Orders({ data, pageIndex, setPageIndex}) {
  const CADollar = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  });

  const formatDate = (date) => { 
    return new Date(date).toLocaleDateString("fr-CA");
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((value, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {value.product.name}
                  </TableCell>
                  <TableCell>{formatDate(value.created_at)}</TableCell>
                  <TableCell><Badge variant="outline">{value.status}</Badge></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setPageIndex(pageIndex - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{pageIndex + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#"  onClick={() => setPageIndex(pageIndex + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
