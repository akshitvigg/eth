import { useConnect } from "wagmi";

function WalletConnect() {
  const { connect, connectors } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button onClick={() => connect({ connector })} key={connector.id}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}

export default WalletConnect;
