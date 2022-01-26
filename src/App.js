import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Dashboard from "./components/Dashboard";
export default function App() {
  const socketUrl = "wss://stream.binance.com:9443/stream";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl
  );
  const [lastMessage, setLastMessage] = useState({})
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

  const updateMessage = useCallback(() =>{
    setTimeout(()=>{
      setLastMessage(lastJsonMessage);
    }, 500)
  },[lastJsonMessage])

  useEffect(() => {
    updateMessage();
  }, [updateMessage,lastMessage])
  
  return (
    <div className="App">
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Connect
      </button>
      <button
        onClick={handleClickUnSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Disconnect
      </button>
      <span>
        <select onChange={(e) => setType(e.target.value)} value = {type} >
          <option value="price" >Price VS Time</option>
          <option value="quantity">Quantity VS Time</option>
        </select>
      </span>
      <br />
      {lastMessage ? (
        <span>
           <Dashboard message = {lastMessage.data} type= {type}/>
        </span>
      ) : null}
    </div>
  );
}