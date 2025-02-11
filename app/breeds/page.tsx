"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Breed, CatImage } from "@/types/api";
import { CatModal } from "@/components/cat-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useBreeds, useBreedCats } from "@/hooks/use-cats";
import Loader from "@/components/loader";
import { useRouter, useSearchParams } from "next/navigation";
import { addSearchParams, deleteSearchParams } from "@/lib/utils";

export default function BreedsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catId = searchParams.get("cat");
  const breedId = searchParams.get("breed");
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false);
  const { data: breeds, isLoading: breedsLoading } = useBreeds();
  const { data: breedCats, isLoading: catsLoading } = useBreedCats(breedId);

  useEffect(() => {
    if (catId) {
      setSelectedCatId(catId);
      setIsCatModalOpen(true);
    } else {
      setIsCatModalOpen(false);
    }
    if (breedId) {
      setSelectedBreedId(breedId);
      setIsBreedModalOpen(true);
    }
  }, [catId, breedId]);

  const openCatModal = (cat: CatImage) => {
    addSearchParams(router, "cat", cat.id);
    setSelectedCatId(catId);
  };

  const closeCatModal = () => {
    deleteSearchParams(router, "cat");
    setIsCatModalOpen(false);
  };

  const openBreedModal = (breed: Breed) => {
    addSearchParams(router, "breed", breed.id);
    setSelectedCatId(breed.id);
  };

  const closeBreedModal = () => {
    deleteSearchParams(router, "breed");
    setIsBreedModalOpen(false);
  };

  if (breedsLoading) return <Loader />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {breeds?.map((breed) => (
          <Card
            key={breed.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => openBreedModal(breed)}
          >
            <CardHeader>
              <CardTitle>{breed.name}</CardTitle>
              <p className="text-sm text-gray-600 mt-2">{breed.description}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Dialog open={isBreedModalOpen} onOpenChange={closeBreedModal}>
        <DialogContent className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">
            {breeds?.find((b) => b.id === selectedBreedId)?.name} Images
          </h2>
          {catsLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {breedCats?.map((cat) => (
                <div
                  key={cat.id}
                  className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openCatModal(cat)}
                >
                  <Image
                    src={cat.url || "/placeholder.svg"}
                    alt="Cat image"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <CatModal
        catId={selectedCatId}
        isOpen={isCatModalOpen}
        onClose={closeCatModal}
      />
    </div>
  );
}
