import { useQuery } from "@tanstack/react-query";
import { AuthControllerApi, Configuration } from "../api";

const authApi = new AuthControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
    staleTime: Infinity, 
  }).data;
};