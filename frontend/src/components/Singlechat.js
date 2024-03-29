import React, { useState, useEffect } from "react";
import { Globalcontext } from "../store/context";
import { Box, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { padding } from "@mui/system";
import Profileimage from "./Profileimage";
import Updategroupchat from "./Updategroupchat";
import Input from "./Input";
import "./common.css";
import axios from "axios";
import { messageApi } from "../utils/config";
import io from "socket.io-client";
import Scrollchat from "./Scrollchat";
const Endpoint = "http://localhost:5000";
var socket, singlechatconnect;
const Singlechat = () => {
  const {
    user,
    Selectedstate,

  } = Globalcontext();
  console.log("selectedchat", Selectedstate);
  useEffect(() => {
    socket = io(Endpoint);
    socket.emit("setup", user);
    socket.on("data", () => setsocketConnect(true));
  }, [user]);
  const [message, setmessage] = useState([]);
  const [socketConnect, setsocketConnect] = useState(false);
  const [newMessage, setnewMessage] = useState();
  const fetchallMessage = () => {
    if (!Selectedstate) {
      return;
    } else {
      const config = { headers: { Authorization: user.token } };
      axios
        .get(`${messageApi}/${Selectedstate._id}`, config)
        .then((res) => setmessage(res.data))
        .catch((e) => console.log("err", e));
      socket.emit("join chat", Selectedstate._id);
    }
  };
  const Typinghandler = (e) => {
    setnewMessage(e.target.value);
  };
  const sendMessage = (event) => {
    if (event.key === "Enter" && newMessage) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      };
      axios
        .post(
          `${messageApi}`,
          { content: newMessage, chatId: Selectedstate._id },
          config
        )
        .then((res) =>
          setmessage([...message, res.data], socket.emit("message", res.data))
        )
        .catch((e) => console.log("err", e))
        .finally(() => setnewMessage(""));
    }
  };
  const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 25px 0",
    flex: "0 0 70%",
  };
  useEffect(() => {
    console.log("chatatatatatatata")
    fetchallMessage();
    singlechatconnect = Selectedstate;
  });
  useEffect(() => {
    socket.on("message", (newMessage) => {
      if (!singlechatconnect || singlechatconnect._id !== newMessage.chat._id) {
        // print notification 
      } else {
        setmessage([...message, newMessage]);
      }
    });
  });
  return (
    <Box>
      {Selectedstate ? (
        <React.Fragment>
          {!Selectedstate.isGroupchat ? (
            <Box sx={style}>
              <Typography variant="h4">
                {Selectedstate.users[0].name}
              </Typography>
              <Profileimage
                button={<RemoveRedEyeIcon color="action"/>}
                name={Selectedstate.users[0].name}
                email={Selectedstate.users[0].email}
                avtar={Selectedstate.users[0].pic}
              />
            </Box>
          ) : (
            <React.Fragment>
              <Box sx={style}>
                <Typography variant="h4">
                  {Selectedstate.chatName.toUpperCase()}
                </Typography>
                <Updategroupchat fetchallMessage={fetchallMessage} />
              </Box>
            </React.Fragment>   
          )}
          <Box 
            sx={{
              display: "flex",
              height: "80vh",
              flexDirection:"column",
              justifyContent: "flex-end",
              width: "100%",
            }}
            onKeyDown={sendMessage}
          >
          <Scrollchat message={message} />
            <Input
              placeholder="Enter Your Message..."
              className="data"
              value={newMessage}
              onChange={Typinghandler}
            />  
          </Box>
        </React.Fragment>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "80vh",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            click on the chat to start to chat
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Singlechat;
