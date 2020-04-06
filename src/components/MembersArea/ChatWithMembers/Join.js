import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.scss";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          {/* <select
            onChange={event => {
              console.log(event.target.value);
              setRoom(event.target.value);
            }}
          >
            <option>Select</option>
            <option value="troll box">Troll Box</option>
            <option value="bitcoin">Bitcoin</option>
            <option>Alt Coins</option>
            <option>Misc</option>
          </select> */}
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={event => {
              console.log(event.target.value);
              setRoom(event.target.value);
            }}
          />
        </div>
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          to={`/member/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Join Chat Room
          </button>
        </Link>
      </div>
    </div>
  );
}
