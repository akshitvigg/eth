import { createClient, http } from "viem";
import "./App.css";
import { createConfig, injected, WagmiProvider } from "wagmi";
import { mainnet } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WalletConnect from "./components/WalletConnect";
import SendEth from "./components/sendeth";
import ShowInfo from "./components/showbalance";

export const config = new createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: { [mainnet.id]: http() },
});

export const queryClient = new QueryClient();

function App() {
  return (
    <div className=" flex items-center  justify-center min-h-screen bg-zinc-900 text-white">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div>
            <WalletConnect />
            <SendEth />
            <ShowInfo />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
export default App;
