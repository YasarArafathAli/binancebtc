import { useCallback, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Dashboard from "./components/Dashboard";

export default function App() {
  const socketUrl = "wss://stream.binance.com:9443/stream";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl
  );

  const messageHistory = useRef([]);  

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastJsonMessage ?? []),[lastJsonMessage]
  );

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
      <br />
      {lastJsonMessage ? (
        <span>
          Last message: {JSON.stringify(lastJsonMessage.data, null, 4)}
        </span>
      ) : null}
    <ul>
      {messageHistory.current.map((message, index) => {

        const test= message.data;
          return (<div key={index}>
          <Dashboard message ={message.data} />
          </div>)
      })}
      </ul>
    </div>
  );
}