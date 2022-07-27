import React, { useContext } from "react";
import {
  BoldSpan,
  BoxContainer,
  SmallSpan,
  SubmitButton,
  Marginer,
  BreakLine,
} from "../../css/CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { SwitcherContext } from "./LoginPage";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Dashboard from "../sellerDashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, googleloginAsync } from "../../controller/login/thunks";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import io from "socket.io-client";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  boxShadow: "none",
}));
const socket = io.connect("http://localhost:8888");
function LoginForm(prop) {
  const dispatch = useDispatch();

  function handleCallBackResponse(res) {
    dispatch(googleloginAsync({ jwt: res.credential })).then((result) => {
      loginSuccess(result);
    });
  }
  // const [user, setUser] = useState({});
  useEffect(() => {
    // global google
    try {
      window.google.accounts.id.initialize({
        client_id:
          "1089072716137-04fc5dho1ovglbmmpoagr24t83pqrjic.apps.googleusercontent.com",
        callback: handleCallBackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignIn"),
        {
          theme: "filled_blue",
          shape: "pill",
          size: "large",
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  let navigate = useNavigate();
  const handerSwitch = useContext(SwitcherContext);
  const [emailValue, setEmail] = React.useState("");
  const [pwdValue, setPwd] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const [seller, setSeller] = React.useState(true);
  const [remember, setRemember] = React.useState(true);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const handleVisible = () => setVisible(!visible);

  const validateEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError("");
  };
  const validatePwd = (event) => {
    const value = event.target.value;
    setPwd(value);
    setPasswordError("");
  };

  const handlerValidation = (event) => {
    event.preventDefault();
    let account = {
      userEmail: emailValue,
      password: pwdValue,
      isRemember: remember,
      isSeller: seller,
    };
    return dispatch(loginAsync(account)).then((result) => {
      loginSuccess(result);
    });
  };
  const loginSuccess = (result) => {
    try {
      let role = result.payload.role;
      let path;
      if (result.payload.status === 400) {
        console.log(result);
        handleFail(result.payload.error);
        throw Error("role undefine");
      } else if (role === true) {
        socket.emit("join_room", result.payload.email);
        path = "../sellerX/dashboard";
      } else {
        path = "/";
      }
      navigate(path);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFail = (err) => {
    if (err !== undefined) {
      if (err.includes("email")) setEmailError(err);
    }
    if (err.includes("password")) setPasswordError(err);
  };
  const handleOnClickSeller = (event) => {
    setSeller(event.target.checked);
  };
  const handleOnClickRemember = (event) => {
    setRemember(event.target.checked);
  };

  return (
    <BoxContainer
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handlerValidation(event);
        }
      }}
    >
      <Box>
        <CssTextField
          id="outlined-email-input-error-helper-text"
          label="Email"
          type="email"
          error={emailError !== ""}
          helperText={emailError !== "" ? emailError : ""}
          onChange={validateEmail}
        />
        <Marginer direction="vertical" margin="1vh" />
        <CssTextField
          id="outlined-password-input-error-helper-text"
          label="Password"
          type={visible ? "password" : "text"}
          error={passwordError !== ""}
          helperText={passwordError !== "" ? passwordError : ""}
          autoComplete="current-password"
          onChange={validatePwd}
          InputProps={{
            endAdornment: (
              <IconButton aria-label="edit" onClick={handleVisible}>
                {visible && <VisibilityIcon />}
                {!visible && <VisibilityOffIcon />}
              </IconButton>
            ),
          }}
        />
        <Marginer direction="vertical" margin="3vh" />

        <Grid container spacing={1}>
          <Grid item xs={12} md={8} sm={12}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox defaultChecked onClick={handleOnClickRemember} />
                  }
                  label="Remember Me"
                />
              </FormGroup>
            </Item>
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox defaultChecked onClick={handleOnClickSeller} />
                  }
                  label="Seller"
                />
              </FormGroup>
            </Item>
          </Grid>
        </Grid>
        <Marginer direction="vertical" margin="1vh" />
        <SubmitButton type="submit" onClick={handlerValidation}>
          Sign in
        </SubmitButton>
      </Box>

      <Marginer direction="vertical" margin="1vh" />
      <SmallSpan href="#">
        Don't have an account?
        <BoldSpan href="#" onClick={handerSwitch}>
          Signup
        </BoldSpan>
        <Marginer direction="vertical" margin="2vh" />
        <BreakLine />
        <div id="googleSignIn"></div>
        <Marginer direction="vertical" margin="2vh" />
      </SmallSpan>
      <IconButton onClick={() => navigate("../")}>
        <ArrowBackIcon />
      </IconButton>
    </BoxContainer>
  );
}

export default LoginForm;
