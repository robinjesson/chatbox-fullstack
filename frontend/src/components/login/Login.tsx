import { useForm } from "react-hook-form";
import {
  AuthControllerApi,
  Configuration,
  type LoginRequest,
  type UserResponse,
} from "../../api";
import { useMutation, useQuery } from "@tanstack/react-query";

const authApi = new AuthControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<UserResponse | undefined>>;
  user: UserResponse | undefined;
}

const Login = ({ setUser, user }: LoginProps) => {
  const { register, getValues } = useForm<LoginRequest>();
  const { mutate: login } = useMutation({
    mutationFn: () => authApi.login({ loginRequest: getValues() }),
    onSuccess: () => {
      authApi.me().then((res) => setUser(res));
    },
  });
  return (
    <>
      {!user ? (
        <>
          <div>Login</div>
          <input type="text" placeholder="Username" {...register("uid")} />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <button onClick={() => login()}>Login</button>
        </>
      ) : (
        <div>Welcome {user.uid}</div>
      )}
    </>
  );
};

export default Login;
