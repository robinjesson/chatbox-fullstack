import { type UserResponse } from "../../api";
import { useUser } from "../../hooks";
import Login from "../Login/Login";

interface MenuProps {
  setUser: React.Dispatch<React.SetStateAction<UserResponse | undefined>>;
}

const Menu = ({ setUser }: MenuProps) => {
  const { data: me } = useUser();

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
