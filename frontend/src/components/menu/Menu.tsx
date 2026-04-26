import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AuthControllerApi, Configuration, type UserResponse } from "../../api";
import Login from "../login/Login";
import Signup from "../signup/Signup";

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
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">Chatbox</div>
        <div className="flex gap-2">
          {!me && (
            <>
              <button
                className="btn"
                onClick={() => setToggleLoginSignup("signup")}
              >
                Sign Up
              </button>
              <button
                className="btn"
                onClick={() => setToggleLoginSignup("login")}
              >
                Log In
              </button>
              {toggleLoginSignup === "signup" ? <Signup /> : <Login />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
