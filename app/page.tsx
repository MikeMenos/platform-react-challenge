"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CatModal } from "@/components/cat-modal";
import type { CatImage } from "@/types/api";
import Image from "next/image";
import { useRandomCats } from "@/hooks/use-cats";
import { useState, useEffect } from "react";
import Loader from "@/components/loader";
import { addSearchParams, deleteSearchParams } from "@/lib/utils";
import Error from "@/components/error";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catId = searchParams.get("cat");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useRandomCats();

  useEffect(() => {
    if (catId) {
      setSelectedId(catId);
      setIsOpen(true);
    }
  }, [catId]);

  const openModal = (cat: CatImage) => {
    addSearchParams(router, "cat", cat.id);
    setSelectedId(catId);
  };

  const closeModal = () => {
    deleteSearchParams(router, "cat");
    setIsOpen(false);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  const cats = (data?.pages.flat() as CatImage[]) ?? [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Random Cats</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(cat)}
          >
            <Image
              src={cat.url || "/placeholder.svg"}
              alt={cat.breeds?.[0]?.name || "Cat image"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More Cats"
            : "No more cats"}
        </Button>
      </div>

      <CatModal catId={selectedId} isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
