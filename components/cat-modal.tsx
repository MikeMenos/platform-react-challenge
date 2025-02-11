"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  useFavoriteMutations,
  useFavorites,
  useSingleCat,
} from "@/hooks/use-cats";
import Loader from "./loader";
import Error from "./error";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CatModalProps {
  catId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CatModal({ catId, isOpen, onClose }: CatModalProps) {
  const { addFavorite, removeFavorite } = useFavoriteMutations();
  const { data: favorites, isFetching } = useFavorites();
  const { data: cat, isLoading, isError } = useSingleCat(catId);
  const isAlreadyInFavorites = favorites?.find(
    (favorite) => favorite.image_id === catId
  );

  const handleFavorite = async () => {
    if (isAlreadyInFavorites) {
      removeFavorite.mutate(isAlreadyInFavorites.id);
    } else catId && addFavorite.mutate(catId);
  };

  if (isLoading) return <Loader />;
  if (isError || !cat) return <Error />;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="relative aspect-video w-full">
          <Image
            src={cat.url || "/placeholder.svg"}
            alt={cat.breeds?.[0]?.name || "Cat image"}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {cat.breeds?.[0]! && (
          <div className="mt-4">
            <Link href={`/breeds/?breed=${cat.breeds[0].id}`}>
              <h2 className="text-2xl font-bold hover:cursor-pointer">
                {cat.breeds[0].name}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{cat.breeds[0].description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Origin: {cat.breeds[0].origin}</p>
              <p>Temperament: {cat.breeds[0].temperament}</p>
              <p>Life Span: {cat.breeds[0].life_span} years</p>
            </div>
          </div>
        )}

        <Button
          onClick={handleFavorite}
          disabled={
            addFavorite.isPending || removeFavorite.isPending || isFetching
          }
          className="mt-4"
        >
          {isAlreadyInFavorites ? (
            <Trash2 className="mr-2 h-4 w-4" />
          ) : (
            <Heart className="mr-2 h-4 w-4" />
          )}
          {isAlreadyInFavorites ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
