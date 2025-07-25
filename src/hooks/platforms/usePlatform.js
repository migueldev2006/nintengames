import { getPlatforms } from "@/axios/platforms/getPlatforms";
import { useQuery } from "@tanstack/react-query";

export function usePlatforms() {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: getPlatforms,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    select: (data) => (Array.isArray(data) ? data : []),
  });
}
