import React from "react";
import ProfileContent from "./ProfileContent";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import ProfileLeftContent from "./ProfileLeftContent";
import { useState } from "react";
import ChangePasswordContent from "./ChangePasswordContent";

function ProfilePage() {
  const [Controller, setController] = useState("personalInformation");
  return (
    <Container maxWidth="xl" className="dashboard">
      {/* <Box sx={{ flexGrow: 1 }}> */}

      <Grid container spacing={1} sx={{ marginTop: "1vh" }}>
        <Grid
          item
          lg={4}
          md={3}
          sx={{ marginLeft: "-2vw", marginTop: "-5vh" }}
        >
          <ProfileLeftContent
            ControllerName={Controller}
            ControllerFunction={setController}
          />
        </Grid>

        <Grid item lg={8} md={3} sx={{ marginTop: "-5vh" }}>
          {Controller === "" && <ProfileContent />}
          {Controller === "personalInformation" && <ProfileContent />}
          {/* {Controller === "Payment" && <PaymentContent />} */}
          {Controller === "ChangePassword" && <ChangePasswordContent />}
        </Grid>
      </Grid>
      {/* </Box> */}
    </Container>
  );
}

export default ProfilePage;
