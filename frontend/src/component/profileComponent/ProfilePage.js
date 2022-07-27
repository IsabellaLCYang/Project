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
      <Grid container spacing={0}>
        <Grid item lg={3} md={6} sm={12} sx={{ marginTop: "-5vh" }}>
          <ProfileLeftContent
            ControllerName={Controller}
            ControllerFunction={setController}
          />
        </Grid>

        <Grid item sx={{ marginTop: "-5vh" }}>
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
