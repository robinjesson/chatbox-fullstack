import "./App.css";
import Chatbox from "./components/chatbox/Chatbox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type UserResponse } from "./api";
import { useState } from "react";
import Menu from "./components/menu/Menu";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<UserResponse>();

  return (
    <div className="h-full w-full flex">
      <QueryClientProvider client={queryClient}>
        <Menu setUser={setUser} />
        {user && <Chatbox user={user} />}
      </QueryClientProvider>
    </div>
  );
}

export default App;
