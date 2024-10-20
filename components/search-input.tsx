'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { buildPathWithSearchParams } from '@/helpers/url';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchInput() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()
  const search = (searchParams.get('search') ?? '').toLowerCase()

  const handleOnValueChange = useDebouncedCallback((value: string) => {   
    const url = buildPathWithSearchParams({
      pathName, 
      searchParams, 
      search: [
        { name:'search', value},
        { name:'page', value: '1'}
      ]
    })    

    route.replace(url)    
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
