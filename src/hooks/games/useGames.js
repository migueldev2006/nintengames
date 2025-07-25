import { deletegame } from "@/axios/games/deleteGames";
import { getGameById } from "@/axios/games/getGameById";
import { getGames } from "@/axios/games/getGames";
import { createGame } from "@/axios/games/postGames";
import { updateGame } from "@/axios/games/putGames";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGames() {
  return useQuery({
    queryKey: ["videojuegos"],
    queryFn: getGames,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true, 
  });
}

export function useGameById(id) {
  return useQuery({
    queryKey: ["videojuego", id],
    queryFn: () => getGameById(id),
    enabled: !!id,
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries(["videojuegos"]);
    },
  });
}

export function useUpdateGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateGame(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["videojuegos"]);
    },
  });
}

export function useDeleteGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletegame,
    onSuccess: () => {
      queryClient.invalidateQueries(["videojuegos"]);
    },
  });
}
