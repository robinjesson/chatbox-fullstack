import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Chatbox from "./components/Chatbox/Chatbox";
import Menu from "./components/Menu/Menu";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Menu />
      <div className="flex-in flex-out-row">
        <Chatbox />
      </div>
    </QueryClientProvider>
  );
}

export default App;
