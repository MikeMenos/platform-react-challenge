"use server";

import { revalidatePath } from "next/cache";

const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;
const API_URL = "https://api.thecatapi.com/v1";

export async function addToFavorites(imageId: string) {
  const res = await fetch(`${API_URL}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY!,
    },
    body: JSON.stringify({
      image_id: imageId,
    }),
  });

  revalidatePath("/favorites");
  return res.json();
}

export async function removeFromFavorites(favoriteId: string) {
  await fetch(`${API_URL}/favourites/${favoriteId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": API_KEY!,
    },
  });

  revalidatePath("/favorites");
}
