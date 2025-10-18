import React from "react";
import LoginImage from "../../components/admin/userinterface/LoginImage";
import { Grid } from "@mui/material";
import LogInDetails from "../../components/admin/userinterface/LogInDetails";
import LogInOTP from "../../components/admin/userinterface/LogInOTP";

import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/admin/userinterface/Header";

export default function LogInScreen() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
   
  return (
    <div>
      <Header/>
   
    <Grid container spacing={2}>
      <Grid item xs={12} style={{marginTop: 20,display: "flex",justifyContent: "center",alignItems: "center",}}>
        <Grid md={6} item>
          {!matches ? (
            <div>
              <LoginImage />
            </div>
          ) : (
            <div></div>
          )}
        </Grid>

        <Grid item xs={12} md={6} style={{ marginRight: 10, display: "flex", justifyContent: "center" }}>
          <LogInOTP />
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}
