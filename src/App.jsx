import "./App.css";

import { Chat, Sidebar } from "./components";
import React, { useEffect, useState } from "react";

import Pusher from "pusher-js";
import axios from "./axios";

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("/messages/sync")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("3981867da7b75ce73d65", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div
      className="bg-dark1 p-[20px] flex"
      onMouseUp={() =>
        document
          .querySelectorAll(".sidebar_right_icon")
          .forEach((icon) => icon.classList.remove("bg-gray1Light"))
      }
    >
      <Sidebar />
      <Chat messages={messages} />
    </div>
  );
};

export default App;
