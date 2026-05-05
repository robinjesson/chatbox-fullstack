import { useUser } from "../../hooks";
import Login from "../Login/Login";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  const me = useUser();

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">Chatbox</div>
        <div className="flex gap-2">{me ? me.uid : <Login />}</div>
      </div>
    </>
  );
};

export default Menu;
