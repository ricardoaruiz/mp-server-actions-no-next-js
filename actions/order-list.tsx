"use server";

import { Order } from "@/model";
import { OrderListRequest, OrderListResponse } from "./types";
import { ORDER_URL } from "./constants";

/**
 * Builds a URL based on the provided filter, order, and page parameters.
 *
 * @param filter - The filter object containing status and search parameters.
 * @param order - The field to order by (default is 'order_date').
 * @param page - The page number (default is 1).
 * @returns The constructed URL string.
 */
const buildUrl = ({
  filter,
  order = "order_date",
  page = 1,
}: OrderListRequest = {}): string => {
  const url = new URL(ORDER_URL);
  const params = new URLSearchParams();

  if (filter) {
    if (filter.status) {
      params.append("status", filter.status);
    }
    if (filter.search) {
      params.append("search", filter.search);
    }
  }

  if (order) {
    params.append("sort", order);
  }

  if (page) {
    params.append("page", `${page}`);
  }

  url.search = params.toString();

  return url.toString();
};

/**
 * Retrieves a list of orders based on the provided filter, order, and page parameters.
 *
 * @param filter - The filter object containing status and search parameters.
 * @param order - The field to order by (default is 'order_date').
 * @param page - The page number (default is 1).
 * @returns The API response containing the list of orders, links, and meta information.
 */
export const orderList = async ({
  filter,
  order,
  page = 1,
}: OrderListRequest = {}): Promise<OrderListResponse> => {
  const response = await fetch(buildUrl({ filter, order, page }), {
    cache: "no-cache",
    next: {
      tags: ["orders"],
    },
  });

  const result = (await response.json()) as OrderListResponse;

  return {
    ...result,
    data: result.data.map((order: Order) => ({
      ...order,
      created_at: new Date(order.created_at),
      updated_at: new Date(order.updated_at),
    })),
  };
};
