'use server';

import { FormFieldsValidationException, validateFormFields } from '@/helpers/form-validation';
import z from 'zod'

const schema = z.object({
  customer_name: z.string().min(1, 'Required field'),
  customer_email: z.string().min(1, 'Required field').email('Invalid email'),
  order_date: z.string().min(1, 'Required field').date(),
  amount_in_cents: z.coerce.string()
    .min(1, 'Required field')
    .regex(/^\d+(,\d{0,2})?$/, 'Invalid amount')
    .transform(val => parseFloat(val.replace(/\./g, '').replace(',', '.')))
    .refine((value) => value > 0, { message: 'Must be greater than 0' }),
  status: z.string().min(1, 'Required field'),    
})

type OrderFormFieldErrors = {
  customer_name?: string[] | undefined;
  customer_email?: string[] | undefined;
  order_date?: string[] | undefined;
  amount_in_cents?: string[] | undefined;
  status?: string[] | undefined;
}

export type OrderFormPrevState = {
  ok: boolean,
  message?: string,
  errors?: OrderFormFieldErrors
}

type OrderFormData = Omit<z.infer<typeof schema>,'amount_in_cents'> & { amount_in_cents: number | string }

export async function orderCreate(prevState: OrderFormPrevState, data: FormData): Promise<OrderFormPrevState> {
  try {
    const { 
      customer_name, 
      customer_email, 
      order_date, 
      amount_in_cents, 
      status 
    } = validateFormFields<OrderFormData, OrderFormFieldErrors>(data, schema)

    const order: OrderFormData = { 
      customer_name, 
      customer_email, 
      order_date, 
      amount_in_cents: +amount_in_cents * 100, 
      status }

      // TODO: create order
      console.log('order', order)

      return { ok: true, message: 'Order created' }
  } catch(error: unknown) {
    if (error instanceof FormFieldsValidationException) {
      return {
        ok: false,
        errors: error.errors
      };
    }
    return {
      ok: false,
      message: 'An error occurred while signing up.'
    };
  }


}