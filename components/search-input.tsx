'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouteHandler } from '@/hooks/useRouteHandler';
import { useDebounceCallback } from 'usehooks-ts'

export default function SearchInput() {

  const { searchParams, replaceUrl } = useRouteHandler()
  const search = (searchParams.get('search') ?? '').toLowerCase()

  const handleOnValueChange = useDebounceCallback((value: string) => {   
    replaceUrl({
      search: [
        { name:'search', value},
        { name:'page', value: '1'}
      ]
    })    
  }, 300)

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        defaultValue={search}
        onChange={(e) => handleOnValueChange(e.currentTarget.value.toLowerCase())}
      />
    </div>
  );
}
