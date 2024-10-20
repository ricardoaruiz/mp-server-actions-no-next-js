import { ReadonlyURLSearchParams } from "next/navigation";

type Search = {
  name: string;
  value: string;
}

type BuildPathWithSearchParams = {
  pathName: string
  searchParams: ReadonlyURLSearchParams
  search: Search | Search[]
}

export const buildPathWithSearchParams = ({ pathName, searchParams, search }: BuildPathWithSearchParams) => {
  const params = new URLSearchParams(searchParams)

  if (Array.isArray(search)) {
    search.forEach(({ name, value }) => {
      !value
        ? params.delete(name)
        : params.set(name, value.toLowerCase())
    })
  } else {
    !search.value
      ? params.delete(search.name)
      : params.set(search.name, search.value.toLowerCase())
  }

  return `${pathName}?${params.toString()}`
}