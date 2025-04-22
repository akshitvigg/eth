import { createClient, http } from "viem";
import "./App.css";
import { createConfig, injected } from "wagmi";
import { mainnet } from "viem/chains";
import { QueryClient } from "@tanstack/react-query";
import WalletConnect from "./components/WalletConnect";

export const config = new createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: { [mainnet.id]: http() },
});

export const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <WalletConnect />
    </div>
  );
}
export default App;
