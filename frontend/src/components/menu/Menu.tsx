import { useQuery } from "@tanstack/react-query";
import { AuthControllerApi, Configuration, type UserResponse } from "../../api";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { useState } from "react";

const authApi = new AuthControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface MenuProps {
  setUser: React.Dispatch<React.SetStateAction<UserResponse | undefined>>;
}

const Menu = ({ setUser }: MenuProps) => {
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
  });
  const [toggleLoginSignup, setToggleLoginSignup] = useState<
    "signup" | "login"
  >("signup");

  if (me) setUser(me);

  return (
    <>
      {!me && (
        <>
          <button
            className="btn"
            onClick={() => setToggleLoginSignup("signup")}
          >
            Sign Up
          </button>
          <button className="btn" onClick={() => setToggleLoginSignup("login")}>
            Log In
          </button>
          {toggleLoginSignup === "signup" ? <Signup /> : <Login />}
        </>
      )}
    </>
  );
};

export default Menu;
