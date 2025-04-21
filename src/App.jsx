import { createConfig, http, injected, useConnect, WagmiProvider } from "wagmi";
import "./App.css";
import { mainnet } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: { [mainnet.id]: http() },
});

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletConnect />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

function WalletConnect() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button key={connector.id} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}

export default App;
