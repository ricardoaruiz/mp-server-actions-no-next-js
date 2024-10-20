import { orderList } from '@/actions/order-list';
import { DrawerDialog } from '@/components/drawer-dialog';
import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axios from 'axios';

type ComponentProps = {
  searchParams?: {
    search?: string;
    status?: string;
    sort: string;
    page: number;
  };
};

export default async function Component({ searchParams }: ComponentProps) {
  const orderListData = await orderList({
    filter: {
      search: searchParams?.search,
      status: searchParams?.status
    },
    order: searchParams?.sort,
    page: Number(searchParams?.page ?? 1)
    
  }) 

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 w-full justify-between flex-wrap">
            <div className="flex gap-4 pt-2">
              <SearchInput />
              <FilterDropdown />
            </div>
            <div className='pt-2'>
              <DrawerDialog />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable data={orderListData.data} />
          <div className="mt-8">
            <Pagination data={orderListData.meta.links} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
