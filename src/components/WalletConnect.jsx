import { useConnect } from "wagmi";

function WalletConnect() {
  const { connect, connectors } = useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          className=" bg-gray-700 p-3 mr-3 rounded-2xl "
          onClick={() => connect({ connector })}
          key={connector.id}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}

export default WalletConnect;
