"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { ComponentProps, useMemo } from "react";
import { Order } from "@/model";
import { cn } from "@/lib/utils";
import { convertToBrazilianReal } from "@/lib/currency";
import DeleteButton from "./delete-button";
import { AnimatePresence } from "framer-motion";
import { useRouteHandler } from "@/hooks/useRouteHandler";

type OrdersTableProps = ComponentProps<typeof Table> & {
  data: Order[];
};

export default function OrdersTable({
  data,
  className,
  ...props
}: OrdersTableProps) {
  const { searchParams, replaceUrl } = useRouteHandler()
  const sort = searchParams.get("sort") ?? "";

  const getSortIndicator = (fieldName: string) => {
    if (sort && sort.includes(fieldName)) {
      return sort.startsWith("-") ? (
        <ChevronUp className="w-4" />
      ) : (
        <ChevronDown className="w-4" />
      );
    }
    return <ChevronsUpDown className="w-4" />;
  };

  const handleSortChange = (fieldName: string) => {
    let value = fieldName;
    if (sort && sort.includes(fieldName)) {
      value = sort.startsWith("-") ? "" : `-${fieldName}`;
    }

    replaceUrl({
      search: { name: "sort", value },
      options: {
        scroll: false,
      }
    })
    
  };

  return (
    <Table className={cn(className)} {...props}>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleSortChange("order_date")}
          >
            <div className="flex items-center gap-1">
              Data
              {getSortIndicator("order_date")}
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleSortChange("amount_in_cents")}
          >
            Valor
            {getSortIndicator("amount_in_cents")}
          </TableHead>
          <TableHead className="text-right cursor-pointer">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {data.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="font-medium">{order.customer_name}</div>
                <div className="hidden md:inline text-sm text-muted-foreground">
                  {order.customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order.order_date}
              </TableCell>
              <TableCell className="text-right">
                {convertToBrazilianReal(order.amount_in_cents)}
              </TableCell>
              <TableCell className="text-right">
                <DeleteButton orderId={order.id} />
              </TableCell>
            </TableRow>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}
