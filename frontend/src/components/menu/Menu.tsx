import { useQuery } from "@tanstack/react-query";
import { AuthControllerApi, Configuration, type UserResponse } from "../../api";
import Login from "../login/Login";

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

  if (me) setUser(me);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">Chatbox</div>
        <div className="flex gap-2">{!me && <Login />}</div>
      </div>
    </>
  );
};

export default Menu;
