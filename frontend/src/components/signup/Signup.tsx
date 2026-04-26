import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthControllerApi, Configuration, type LoginRequest } from "../../api";

const authApi = new AuthControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface SignupProps {}

const Signup = ({}: SignupProps) => {
  const { register, getValues, reset } = useForm<LoginRequest>();
  const { mutate: signup } = useMutation({
    mutationFn: () => authApi.signup({ loginRequest: getValues() }),
    onSuccess: () => {
      reset();
    },
  });
  return (
    <>
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
      <button className="btn" onClick={() => signup()}>
        Sign Up
      </button>
    </>
  );
};

export default Signup;
