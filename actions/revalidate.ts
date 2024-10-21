'use server'

import { revalidateTag } from "next/cache"

export async function revalidateTagClient(tag: string) {
  revalidateTag(tag)
}

export async function revalidatePathClient(path: string) {
  revalidateTag(path)
}