import { Box } from "@mui/material";
import React from "react";
import { Avatar } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import PaymentsIcon from "@mui/icons-material/Payments";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import quinnAvatar from "../../assets/avatar.jpg"; // mock avatar
import { Marginer } from "../../css/CommonStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
const containerBoxStyle = {
  flexGrow: 1,
  borderRadius: "19px",
  backgroundColor: "white",
  width: "100%",
  height: "auto",
  margin: "5vw",
  paddingBottom: "15vh",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
};
const containerBoxStyle_smaller = {
  flexGrow: 1,
  borderRadius: "19px",
  backgroundColor: "white",
  width: "30vw",
  margin: "5vw 20vw",
  paddingLeft: "1vw",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
};
function ProfileLeftContent(props) {
  const theme = useTheme();
  const [pageName, setPageName] = useState("");
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  let CSSButtonStyle = {
    textTransform: "capitalize",
    justifyContent: "flex-start",
    border: "none",
    marginTop: "-5vh",
  };
  const buttons = (props) => {
    return [
      <Button
        sx={CSSButtonStyle}
        key="personalInformation"
        onClick={() => {
          setPageName("personalInformation");
        }}
        // onClick={handleController("personalInformation")}
      >
        <PersonIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "1vw",
            padding: "0.5vw",
          }}
        >
          Personal Information
        </Typography>
      </Button>,
      <Marginer key="1" direction="vertical" margin="1vh" />,
      <Button
        sx={CSSButtonStyle}
        key="Payment"
        onClick={() => {
          setPageName("Payment");
        }}
      >
        <PaymentsIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "3vw",
            padding: "0.5vw",
          }}
        >
          Payment
        </Typography>
      </Button>,
      <Marginer key="2" direction="vertical" margin="1vh" />,
      <Button
        sx={CSSButtonStyle}
        key="ChangePassword"
        onClick={() => {
          setPageName("ChangePassword");
        }}
      >
        <LockOutlinedIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "1vw",
            padding: "0.2vw",
          }}
        >
          Change Password
        </Typography>
      </Button>,
    ];
  };

  const buttonsH = (props) => {
    return [
      <Button
        sx={CSSButtonStyle}
        key="personalInformation"
        onClick={() => {
          setPageName("personalInformation");
        }}
      >
        <PersonIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "1vw",
          }}
        >
          Personal Information
        </Typography>
      </Button>,
      <Button
        sx={CSSButtonStyle}
        key="Payment"
        onClick={() => {
          setPageName("Payment");
        }}
      >
        <PaymentsIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "3vw",
          }}
        >
          Payment
        </Typography>
      </Button>,
      <Button
        sx={CSSButtonStyle}
        key="ChangePassword"
        onClick={() => {
          setPageName("ChangePassword");
        }}
      >
        <LockOutlinedIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "1vw",
          }}
        >
          Change Password
        </Typography>
      </Button>,
    ];
  };
  useEffect(() => {
    props.ControllerFunction(pageName);
  }, [pageName]);

  return (
    <Box sx={matches ? containerBoxStyle : containerBoxStyle_smaller}>
      <Marginer direction="vertical" margin="10vh" />

      {matches ? (
        <Avatar
          src={quinnAvatar}
          sx={{
            width: 100,
            height: 100,
            marginLeft: "5vw",
            position: "relative",
          }}
        />
      ) : (
        <Avatar
          src={quinnAvatar}
          sx={{
            width: 75,
            height: 75,
            marginLeft: "8vw",
            position: "relative",
          }}
        />
      )}

      <Box
        sx={
          matches
            ? {
                display: "flex",
                "& > *": {
                  m: 1,
                },
              }
            : ""
        }
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          sx={{ marginTop: "10vh", width: "100%" }}
        >
          {matches ? buttons(props) : buttonsH(props)}
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default ProfileLeftContent;
