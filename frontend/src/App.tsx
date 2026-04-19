import "./App.css";
import Chatbox from "./components/chatbox/Chatbox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { UserResponse } from "./api";
import { useState } from "react";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState<UserResponse>();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Signup />
        <Login setUser={setUser} user={user} />
        {user && <Chatbox user={user} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
