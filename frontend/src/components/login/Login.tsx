import { useForm } from "react-hook-form";
import { AuthControllerApi, Configuration, type LoginRequest } from "../../api";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const authApi = new AuthControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const { register, getValues } = useForm<LoginRequest>();
  const queryClient = new QueryClient();
  const { mutate: login } = useMutation({
    mutationFn: () => authApi.login({ loginRequest: getValues() }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
  return (
    <>
      <div>Login</div>
      <input
        className="input"
        type="text"
        placeholder="Username"
        {...register("uid")}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <button className="btn" onClick={() => login()}>
        Login
      </button>
    </>
  );
};

export default Login;
