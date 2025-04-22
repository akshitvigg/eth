import { useAccount, useBalance } from "wagmi";

function ShowInfo() {
  const { address } = useAccount();
  const balance = useBalance({ address });

  function copyAddress() {
    navigator.clipboard.writeText(address);
  }

  return (
    <div>
      {address}
      <button className=" bg-red-400" onClick={copyAddress}>
        copy
      </button>
      <br />
      {balance?.data?.value}
    </div>
  );
}

export default ShowInfo;
