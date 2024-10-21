import { z } from "zod";
import { CREATE_ORDER_FORM_SCHEMA } from "./constants";
import { Order } from "@/model";

// ==== API Request
export type APIRequest<TFilter> = {
  filter?: TFilter;
  order?: string;
  page?: number;
}

export type SortDirection = 'asc' | 'desc';

// ==== API Response
export type APIResponse<T> = {
  data: T;
  links: Links
  meta: Meta
}

type Links = {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export type MetaLink = {
  url: string | null;
  label: string;
  active: boolean;
}

type Meta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: MetaLink[]
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

// ================ Actions =================

// ==== Form Validation
type FormPrevState<TFieldErrors> = {
  ok?: boolean;
  message?: string;
  errors?: TFieldErrors;
}

// ==== Order List
export type OrderFilter = {
  status?: string;
  search?: string;
};

export type OrderListRequest = APIRequest<OrderFilter>;
export type OrderListResponse = APIResponse<Order[]>;

// ==== Order Create
export type OrderFormFieldErrors = {
  customer_name?: string[] | undefined;
  customer_email?: string[] | undefined;
  order_date?: string[] | undefined;
  amount_in_cents?: string[] | undefined;
  status?: string[] | undefined;
};

export type CreateOrderFormPrevState = FormPrevState<OrderFormFieldErrors>;

export type OrderFormData = Omit<
  z.infer<typeof CREATE_ORDER_FORM_SCHEMA>,
  "amount_in_cents"
> & {
  amount_in_cents: number | string;
};

// ==== Order Delete
export type DeleteOrderFormPrevState = FormPrevState<void>;