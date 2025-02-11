import { Breed, CatImage, FavoriteResponse } from "@/types/api";

const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;
const API_URL = "https://api.thecatapi.com/v1";

export async function getRandomCats(limit = 10) {
  const res = await fetch(
    `${API_URL}/images/search?limit=${limit}&has_breeds=1`,
    {
      headers: {
        "x-api-key": API_KEY!,
      },
    }
  );
  return res.json() as Promise<CatImage[]>;
}

export async function getCatById(catId: string) {
  const res = await fetch(`${API_URL}/images/${catId}`, {
    headers: {
      "x-api-key": API_KEY!,
    },
  });
  return res.json() as Promise<CatImage>;
}

export async function getBreeds() {
  const res = await fetch(`${API_URL}/breeds`, {
    headers: {
      "x-api-key": API_KEY!,
    },
  });
  return res.json() as Promise<Breed[]>;
}

export async function getCatsByBreed(breedId: string) {
  const res = await fetch(
    `${API_URL}/images/search?breed_ids=${breedId}&limit=10`,
    {
      headers: {
        "x-api-key": API_KEY!,
      },
    }
  );
  return res.json() as Promise<CatImage[]>;
}

export async function getFavorites() {
  const res = await fetch(`${API_URL}/favourites`, {
    headers: {
      "x-api-key": API_KEY!,
    },
  });
  return res.json() as Promise<FavoriteResponse[]>;
}
