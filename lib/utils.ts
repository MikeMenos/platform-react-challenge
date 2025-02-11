import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deleteSearchParams(
  router: AppRouterInstance,
  paramToDelete: string
) {
  const newParams = new URLSearchParams(window.location.search);
  newParams.delete(paramToDelete);
  router.push(`?${newParams.toString()}`, { scroll: false });
}

export function addSearchParams(
  router: AppRouterInstance,
  paramToAdd: string,
  paramId: string
) {
  const newParams = new URLSearchParams(window.location.search);
  newParams.set(paramToAdd, paramId);
  router.push(`?${newParams.toString()}`, { scroll: false });
}
