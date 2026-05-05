import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { type UserResponse } from "./api";
import "./App.css";
import Chatbox from "./components/Chatbox/Chatbox";
import Menu from "./components/Menu/Menu";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<UserResponse>();

  return (
    <QueryClientProvider client={queryClient}>
      <Menu setUser={setUser} />
      <div className="flex-in flex-out-row">
        {user && <Chatbox user={user} />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
