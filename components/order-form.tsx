'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from './ui/button';
import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { orderCreate, OrderFormPrevState } from '@/actions/order-create';
import { useState } from 'react';
import { format } from 'date-fns';
import { useFormState } from 'react-dom';

const prevState: OrderFormPrevState = {
  ok: false
}

export default function OrderForm() {
  const [state, action] = useFormState(orderCreate, prevState)
  const [orderDate, setOrderDate] = useState<string | undefined>();

  return (
    <form action={action} className="grid items-start gap-2" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="customer_name">Nome do Cliente</Label>
        <Input
          name="customer_name"
          id="customer_name"
          placeholder="José Carlos da Silva"
        />
        <p className="text-sm text-red-500 min-h-5">{state.errors?.customer_name && state.errors.customer_name[0]}</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="customer_email">Email do Cliente</Label>
        <Input
          name="customer_email"
          type="email"
          id="customer_email"
          placeholder="jose@example.com"
        />
        <p className="text-sm text-red-500 min-h-5">{state.errors?.customer_email &&state.errors.customer_email[0]}</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status">
          <SelectTrigger className="">
            <SelectValue placeholder="Pendente | Completo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="completed">Completo</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-red-500 min-h-5">{state.errors?.status && state.errors.status[0]}</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="username">Data do Pedido</Label>
        <DatePicker onSelect={(date) => setOrderDate(() => date ? format(date, 'yyyy-MM-dd') : '')} />
        <input type="hidden" name="order_date" value={orderDate} />
        <p className="text-sm text-red-500 min-h-5">{state.errors?.order_date && state.errors.order_date[0]}</p>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="amount_in_cents">Valor do Pedido</Label>
        <Input
          name="amount_in_cents"
          id="amount_in_cents"
          placeholder="100,00"
        />
        <p className="text-sm text-red-500 min-h-5">{state.errors?.amount_in_cents && state.errors.amount_in_cents[0]}</p>
        <Button type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
