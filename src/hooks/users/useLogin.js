import { login } from "@/axios/users/postLogin";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn:login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token); 
      router.push("/games");
    },
    onError: (error) => {
      console.error("Error en login:", error);
    },
  });

  return mutation;
}
