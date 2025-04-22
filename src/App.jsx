import {
  createConfig,
  http,
  injected,
  useAccount,
  useBalance,
  useConnect,
  WagmiProvider,
} from "wagmi";
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
          <MyAddress />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

function MyAddress() {
  const { address } = useAccount();
  const balance = useBalance({ address });

  return (
    <div>
      {address} <br />
      {balance?.data?.value}
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
