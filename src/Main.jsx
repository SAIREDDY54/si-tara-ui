import React from "react";
import BoschLogo from "./img/Logo.svg";
import svgLogo from "./img/hero.png";
import BoschRibbon from "./img/boschribbon.png"
import { Stack, Typography, Grid } from "@mui/material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import MainStepper from "./MainStepper";

const Main = () => {
  return (
    
    <Grid container spacing={1} style={{ width: "100%" }}>
      
      <Grid item xs={2}></Grid>
      
      <Grid
        item
        xs={8}
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <img src={BoschRibbon} alt="bosch-logo" height="6px"></img>
        <div
          style={{  
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
          }}
        >
          
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            
            <img src={BoschLogo}  alt="bosch-logo" style={{marginTop: '38px'}} height='25px'></img>
            <span style={{ flex: 1 }}></span>
            <Stack direction="row" alignItems="center">
              <ForumOutlinedIcon fontSize="" style={{marginTop: '38px'}}/>
              <Typography style={{ fontSize: 14, paddingLeft: 6, marginTop: '38px' }}>
                Contact us
              </Typography>
            </Stack>
          </Stack>
          <img
            src={svgLogo}
            alt="team"
            height="200"
            style={{ margin: "30px 0px" }}
          />
          <MainStepper />
        </div>
        <span style={{ flex: "1 auto" }}></span>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          style={{ backgroundColor: "#e2e2e2", padding: 16 }}
        >
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Get in touch with Loreum
            </Typography>
            <Typography style={{ fontSize: 14 }}>
              We look forward to inquiry
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Send us a message
            </Typography>
            <Typography style={{ fontSize: 14 }}>
              To contact form {">"}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Main;