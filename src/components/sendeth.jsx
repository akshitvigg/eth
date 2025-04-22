import { useRef } from "react";
import { useSendTransaction } from "wagmi";

function SendEth() {
  const toRef = useRef();
  const amountRef = useRef();
  const { data: hash, sendTransaction } = useSendTransaction();

  async function ethsend() {
    sendTransaction({
      to: toRef.current.value,
      value: amountRef.current.value,
    });
    console.log(toRef.current.value, amountRef.current.value);
  }
  return (
    <div>
      <input type="text" placeholder="to" ref={toRef} />
      <input type="text" placeholder="amount" ref={amountRef} />
      <button onClick={ethsend}>send</button>
      {hash}
    </div>
  );
}

export default SendEth;
