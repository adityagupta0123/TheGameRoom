import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div className="join_player head"> Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <div>
        <span className="head">TIC TAC TOE</span>
        <Board result={result} setResult={setResult} />
      </div>
      <div className="wind_msg"> 
       <Window>
        <MessageList 
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
       </Window>
      </div>
      <div>
        <button className="bt-out"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
        >
          {" "}
          Leave Game
        </button>
      </div>
      
      {result.state === "won" && <div className="head">{alert(`${result.winner} is Winner`)}{result.winner} Won The Game  </div>}
      {result.state === "tie" && <div className="head">{alert("Game Tieds")}Game Tieds</div>}
    </div>
  );
}

export default Game;