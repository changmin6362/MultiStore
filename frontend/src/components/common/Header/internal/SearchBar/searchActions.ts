"use server";

import { redirect } from "next/navigation";

export async function handleSearchSubmit(formData: FormData) {
  const searchValue = formData.get("query") as string;

  if (searchValue.trim()) {
    redirect(`/search?q=${encodeURIComponent(searchValue)}`);
  }
}
