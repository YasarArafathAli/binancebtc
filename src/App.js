import { useCallback, useMemo, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Dashboard from "./components/Dashboard";
export default function App() {
  const socketUrl = "wss://stream.binance.com:9443/stream";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl
  );
  const [type, setType] = useState("price")
  const messageHistory = useRef([]);  

  messageHistory.current = useMemo(
    () => {
      setTimeout(()=>{
        messageHistory.current.concat(lastJsonMessage ?? [])},1000)
      },[lastJsonMessage]);
  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "SUBSCRIBE",
        params: ["btcusdt@trade"],
        id: 1
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: ["btcusdt@trade"],
        id: 1
      }),
    [sendJsonMessage]
  );

  
  return (
    <div className="App">
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Subscribe
      </button>
      <button
        onClick={handleClickUnSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Unsubscribe
      </button>
      <span>
        <select onChange={(e) => setType(e.target.value)} value = {type} >
          <option value="price" >Price VS Time</option>
          <option value="quantity">Quantity VS Time</option>
        </select>
      </span>
      <br />
      {lastJsonMessage ? (
        <span>
           <Dashboard message = {lastJsonMessage.data} type= {type}/>
        </span>
      ) : null}
    </div>
  );
}