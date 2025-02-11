import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addToFavorites, removeFromFavorites } from "@/app/actions";
import {
  getCatsByBreed,
  getFavorites,
  getRandomCats,
  getBreeds,
  getCatById,
} from "@/lib/api";
import { errorToast, successToast } from "@/components/toasts";

export function useRandomCats() {
  return useInfiniteQuery({
    queryKey: ["cats", "random"],
    queryFn: () => getRandomCats(10),
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });
}

export function useSingleCat(catId: string | null) {
  return useQuery({
    queryKey: ["cat", catId],
    queryFn: () => getCatById(catId!),
    enabled: !!catId,
  });
}

export function useBreeds() {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: getBreeds,
  });
}

export function useBreedCats(breedId: string | null) {
  return useQuery({
    queryKey: ["cats", "breed", breedId],
    queryFn: () => getCatsByBreed(breedId!),
    enabled: !!breedId,
  });
}

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
}

export function useFavoriteMutations() {
  const queryClient = useQueryClient();

  const addFavorite = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      successToast("Cat added to favorites!");
    },
    onError: () => {
      errorToast("Failed to add cat to favorites.");
    },
  });

  const removeFavorite = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      successToast("Cat removed from favorites.");
    },
    onError: () => {
      errorToast("Failed to remove cat from favorites.");
    },
  });

  return { addFavorite, removeFavorite };
}
