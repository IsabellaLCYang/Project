import React from "react";
import { Box } from "@mui/system";

import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { Avatar, TextField } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox, MessageList, Input, Button } from "react-chat-elements";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
const socket = io.connect("http://localhost:8888");
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
function BuyerSearch(prop) {
  const [openSearchChat, setOpenSearchChat] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [warming, setWarming] = React.useState(false);
  const [chatTarget, setChatTarget] = React.useState({});
  const [options, setOptions] = React.useState([]);
  const loading = openSearchChat && options.length === 0;

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseWarming = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarming(false);
  };
  const handleClose = () => {
    setOpen(false);
    socket.emit("send_message", {
      room: chatTarget.email,
      message: prop.self.firstName + " just leave the room",
    });
    socket.disconnect();
    setMessageReceived([]);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...prop.data]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!openSearchChat) {
      setOptions([]);
    }
  }, [openSearchChat]);
  const handleDisplay = (option) => {
    return (
      "Name: " +
      option.firstName +
      " " +
      option.lastName +
      ", Company: " +
      option.company +
      ", Status: " +
      (option.onlineStatus === true ? "Online" : "Offline")
    );
  };
  const handleChatTarget = (data) => {
    socket.connect();
    try {
      socket.emit("join_room", data.email);
      socket.emit("send_message", {
        room: data.email,
        message: prop.self.firstName + " just enter the room",
      });
      let tempEle = {
        position: "right",
        type: "text",
        text: "Join the room ",
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSent = () => {
    if (message !== "") {
      socket.emit("send_message", {
        room: chatTarget.email,
        user: prop.self.firstName,
        message,
      });
      let tempEle = {
        position: "right",
        type: "text",
        text: message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    }
  };
  const handleAutoCompleteSubmit = (event, value) => {
    console.log(value);
    setWarming(false);
    if (value !== null) {
      if (value.onlineStatus) {
        console.log("OPEN 146");
        setChatTarget(value);
        handleChatTarget(value);
        handleClickOpen(value);
      } else {
        setWarming(true);
      }
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      let tempEle = {
        position: "right",
        type: "text",
        text: data.message,
      };
      setMessageReceived((oldArray) => [...oldArray, tempEle]);
    });
  }, []);

  return (
    <Box>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 400 }}
        onChange={(event, value) => {
          handleAutoCompleteSubmit(event, value);
        }}
        open={openSearchChat}
        onOpen={() => {
          setOpenSearchChat(true);
        }}
        onClose={() => {
          setOpenSearchChat(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={handleDisplay}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search to Chat"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <Box>
        <Dialog
          // fullScreen={fullScreen}
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="responsive-dialog-title">
            {chatTarget === null
              ? "None"
              : "Chat With " + chatTarget.firstName + " " + chatTarget.lastName}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={messageReceived}
            />
          </DialogContent>
          <DialogActions>
            <Input
              placeholder="Type here..."
              multiline={true}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              rightButtons={
                <Button
                  type="outlined"
                  color="white"
                  backgroundColor="black"
                  text="Send"
                  onClick={handleSent}
                />
              }
            />
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={warming}
        autoHideDuration={2000}
        onClose={handleCloseWarming}
      >
        <Alert
          onClose={handleCloseWarming}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please select online user!
        </Alert>
      </Snackbar>
    </Box>
  );
}
const chatBotPocData = [
  {
    position: "right",
    type: "text",
    text: "Name:\nNW 1st Floor\n\nPurpose:  \nHome to the Sales, Customer Success and Partnership teams\n\nMeeting Rooms:\n Zugspitze / BER-1-NW-Zugspitze-MR (1) [Phone]\n\nMount Fuji / BER-1-NW-Mount Fuji-MR (1) [Phone]\n\nMont Blanc / BER-1-NW-Mont Blanc-MR (4) [Zoom]\n\nKilimanjaro / BER-1-NW-Kilimanjaro-MR (4) [Zoom]\n\nK2 / BER-1-NW-K2-MR (4) [Zoom]\n\nAmenities: \nKitchen - Microwave, filter coffee machine, oven, dishwasher available\n\nWater fountain from Clage - provides cold still, sparkling and boiling water.\n\nBins - Please separate your trash as indicated.\n\nCrates storage - for you to put your empty bottles.\n\nOpen and secluded lounge areas.\n\nShelves, whiteboards.\n\nWardrobe is part of the furniture near the kitchen.\n\n3 Standing desks near Mount Fuji and Zugspitze to be shared.",
  },
  {
    position: "left",
    type: "text",
    text: "Hi this is a message from Bot",
  },
  {
    position: "left",
    type: "text",
    text: "Hi this is a message from Bot",
  },
];
export default BuyerSearch;
