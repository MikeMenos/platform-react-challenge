"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFavorites, useFavoriteMutations } from "@/hooks/use-cats";
import Loader from "@/components/loader";
import Error from "@/components/error";

export default function FavoritesPage() {
  const { data: favorites, isLoading, isError } = useFavorites();
  const { removeFavorite } = useFavoriteMutations();

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">My Favorite Cats</h1>

      {!favorites?.length ? (
        <p className="text-center text-gray-600">No favorite cats yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="relative group">
              <div className="relative aspect-square">
                <Image
                  src={favorite.image.url || "/placeholder.svg"}
                  alt="Favorite cat"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFavorite.mutate(favorite.id)}
                disabled={removeFavorite.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
