import {
  createConfig,
  http,
  injected,
  useAccount,
  useBalance,
  useConnect,
  useSendTransaction,
  WagmiProvider,
} from "wagmi";
import "./App.css";
import { mainnet } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

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
          <SendEth />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

function MyAddress() {
  const { address } = useAccount();
  const balance = useBalance({ address });

  function copyAddress() {
    navigator.clipboard.writeText(address);
  }
  return (
    <div>
      {address} <button onClick={copyAddress}>copy</button> <br />
      {balance?.data?.value}
    </div>
  );
}

function SendEth() {
  const { data: hash, sendTransaction } = useSendTransaction();
  const toRef = useRef();
  const amountRef = useRef();

  async function ethsend() {
    sendTransaction({
      to: toRef.current.value,
      value: amountRef.current.value,
    });
    console.log(toRef.current.value + amountRef.current.value);
  }

  return (
    <div>
      <input type="text" ref={toRef} placeholder="to" />
      <input type="text" ref={amountRef} placeholder="amount" />
      <button onClick={ethsend}>Send</button>
      {hash}
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
