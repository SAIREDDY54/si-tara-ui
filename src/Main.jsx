import React from "react";

import { Player } from '@lottiefiles/react-lottie-player';
import successData from './lottie/success';
import failedData from './lottie/failed';
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import Axios from "axios";
import BOSCH from "../src/img/bosch.png";
import TALE from "../src/img/talebg.png"
import random from 'random-key-generator';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemText,
  Stack,
} from "@mui/material";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      zIndex: 3,
    },
  },
};

const items = [
  "USB",
  "BLE",
  "JTag",
  "WIFI"
];

const aws_assets = [
  "S3",
  "EC2",
  "DATALAKE",
  "Beanstalk"
];

const azure_assets = [
  "Archive Storage",
  "App Configuration",
  "Azure SQL"
];

const db_assets = [
  "MongoDB",
  "MySQL",
  "Firebase"
];

function getStyles(name, interfaces, theme) {
  return {
    fontWeight:
      interfaces.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Main() {
  const theme = useTheme();
  const [interfaces, setInterfaces] = React.useState([]);
  const [awsCloud, setAwsCloud] = React.useState([]);
  const [azureCloud, setAzureCloud] = React.useState([]);
  const [db, setDB] = React.useState([]);


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterfaces(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

  };

  const awsAssetChange = (event) => {
    const {
      target: { value },
    } = event;
    setAwsCloud(
      typeof value === "string" ? value.split(", ") : value
    )
  }

  const azureAssetChange = (event) => {
    const {
      target: { value },
    } = event;
    setAzureCloud(
      typeof value === "string" ? value.split(", ") : value
    )
  }

  const DBAssetChange = (event) => {
    const {
      target: { value },
    } = event;
    setDB(
      typeof value === "string" ? value.split(", ") : value
    )
  }

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [successDialog, setSuccessDialog] = React.useState(false);
  const [drop, setDrop] = React.useState(false);
  const [data, setData] = React.useState(null);

  const [value, setValue] = React.useState([]);

  // const handleCloudValue = (event) => {
  //   setValue(value === event.target.value ? '' : event.target.value);
  //   // setChecked(true)
  //   console.log("radio value is", event.target.value)
  // };

  const handleCloudValue = (event, option) => {
    const newSelected = [...value];
    if (value.includes(option.id)) {
      newSelected.splice(value.indexOf(option.id), 1);
    } else {
      newSelected.push(option.id);
    }
    console.log("Values is ", newSelected)
    setValue(newSelected);
  };



  const options = [
    { id: 'AWS', label: 'AWS Cloud' },
    { id: 'AZURE', label: 'Azure Cloud' },
    { id: 'DATABASES', label: 'Databases' },
  ];

  // React.useEffect(() => {
  //   lottie.loadAnimation({
  //     container: document.querySelector("#success-logo"),
  //     animationData: successData,
  //     autoplay: true,
  //     loop: true
  //   });
  // }, []);



  function handleOpen() {
    Axios.post("http://localhost:8080/addData", {
      "interfaces": (interfaces.length > 0) ? interfaces : "",
      "awsAssets": (awsCloud.length > 0) ? awsCloud : "",
      "azureAssets": (azureCloud.length > 0) ? azureCloud : "",
      "DBAssets": (db.length > 0) ? db : "",
      "sessionId": random.getRandom(20, 'TARA', '@', 'front')
    }, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })

    // Axios.post("http://localhost:8080/awsCloud", {
    //   "awsAssets": awsCloud,
    //   "sessionId": random.getRandom(20, 'TARA', '@', 'front')
    // }, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })

    setDrop(true)

    var timer = setInterval(function () {
      getStatus(timer)
    }, 1000);



  }

  function getStatus(timer) {
    Axios.get('http://localhost:8080/checkStatus')
      .then(
        res => {
          if (res.data === "Completed") {
            setSuccessDialog(true)
            setDrop(false)
            clearInterval(timer)
            setData(res.data)
          }
        })
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    setInterfaces([]);
    setAwsCloud([]);
    setAzureCloud([]);
    setDB([]);
    setValue([]);
  };

  const handleClickOpenDialog1 = () => {
    setOpenDialog1(true);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialog(false);
    setInterfaces([]);
    setAwsCloud([]);
    setAzureCloud([]);
    setDB([]);
    setValue([]);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={TALE} style={{ height: "50px", maxWidth: "50%", float: "right", marginRight: "10px", marginTop: "5px" }} />
          <h3 style={{ float: "left" }}>Si-TARA</h3>


        </Toolbar>
      </AppBar>

      <Stack direction="row" alignItems="center">
        <Stack direction="column" alignItems="center">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">
              Select Interfaces and Protocols
            </InputLabel>
            <Select
              style={{ zIndex: 2 }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={interfaces}
              onChange={handleChange}
              input={<OutlinedInput label="Select Interfaces and Protocols" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {items.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, interfaces, theme)}
                >
                  {/* <Checkbox checked={interfaces.indexOf(name) > -1} /> */}
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <Button
            disabled={(interfaces.length <= 0) && (awsCloud.length <= 0) && (azureCloud.length <= 0) && (db.length <= 0)}
            variant="contained"
            onClick={() => { handleClickOpenDialog() }}
          >
            Generate TARA
          </Button>

        </Stack>

        {/* {data ? data : "loading"} */}

        <Stack direction={"column"}>
          <div

          >
            {value.map(option => {
              if (option === "AWS") {
                return (
                  <div>
                    <FormControl sx={{ m: 1, width: 300, marginTop: "12px" }}>
                      <InputLabel id="demo-multiple-name-label">
                        Select AWS Assets
                      </InputLabel>
                      <Select
                        style={{ zIndex: 2 }}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={awsCloud}
                        onChange={awsAssetChange}
                        input={<OutlinedInput label="Select AWS Assets" />}
                        MenuProps={MenuProps}
                      >
                        {aws_assets.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, awsCloud, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                );
              }
              if (option === "AZURE") {
                return (
                  <div>
                    <FormControl sx={{ m: 1, width: 300, marginTop: "12px" }}>
                      <InputLabel id="demo-multiple-name-label">
                        Select Azure Assets
                      </InputLabel>
                      <Select
                        style={{ zIndex: 2 }}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={azureCloud}
                        onChange={azureAssetChange}
                        input={<OutlinedInput label="Select Azure Assets" />}
                        MenuProps={MenuProps}
                      >
                        {azure_assets.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, azureCloud, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                );
              }
              if (option === "DATABASES") {
                return (
                  <div>
                    <FormControl sx={{ m: 1, width: 300, marginTop: "12px" }}>
                      <InputLabel id="demo-multiple-name-label">
                        Select Databases
                      </InputLabel>
                      <Select
                        style={{ zIndex: 2 }}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={db}
                        onChange={DBAssetChange}
                        input={<OutlinedInput label="Select Databases" />}
                        MenuProps={MenuProps}
                      >
                        {db_assets.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, db, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                );
              }
            })}

            <div>
              <Stack direction={"row"}>
                {options.map((option) => (
                  <FormControlLabel key={option.id} value={option.id} control={<Checkbox />} label={option.label} checked={value.includes(option.id)} onChange={event => handleCloudValue(event, option)} />
                ))}
              </Stack>
            </div>
          </div>

        </Stack>

      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {"TARA Sheet Will be Generated for"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {interfaces.length >= 0 ? <div>{interfaces.join(", ")}</div> : ""}
            {awsCloud.length >= 0 ? <div>{awsCloud.join(", ")}</div> : ""}
            {azureCloud.length >= 0 ? <div>{azureCloud.join(", ")}</div> : ""}
            {db.length >= 0 ? <div>{db.join(", ")}</div> : ""}
            {/* <div>{awsCloud.length >= 0 ? awsCloud.join(", ") : azureCloud.join(", ")}</div> */}
            <div>
              <strong>Do You Wish to Continue?</strong>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog();
              setInterfaces([]);
              setAwsCloud([]);
              setAzureCloud([]);
              setDB([]);
              handleClickOpenDialog1();
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog();
              handleOpen();

            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog1}
        onClose={handleCloseDialog1}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {"Operation Aborted!"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog1();

            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successDialog}
        onClose={handleCloseSuccessDialog}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          {((awsCloud.length > 0 || interfaces.length > 0 || db.length > 0 || azureCloud.length > 0) && data === "Completed") ? <div>Tara Sheet Created for {awsCloud.join(", ") + ","} {azureCloud.join(", ") + ","} {interfaces.join(", ")} {db.join(", ")}</div> : ""}

        </DialogTitle>
        <DialogContent>
          {data === "Completed" ? <Player src='https://assets5.lottiefiles.com/packages/lf20_pqnfmone.json' loop autoplay style={{ height: '200px', width: '200px' }}/> : <Player src='https://assets1.lottiefiles.com/packages/lf20_tl52xzvn.json' loop autoplay style={{ height: '200px', width: '200px' }}/>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseSuccessDialog();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={drop}
      >
        <Stack direction="column" alignItems="center" display="absolute" >
          <CircularProgress style={{ color: "white" }} />
          <div className="circular-text" style={{ marginTop: "15px", color: "white" }}>
            TARA Sheet is Being Created Please Wait....
          </div>
        </Stack>
      </Backdrop>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          backgroundColor: "#1976d2",
        }}
        elevation={3}
      ><img src={BOSCH} style={{ height: "50px", maxWidth: "50%", float: "right", marginRight: "10px", marginTop: "5px" }} /></Paper>
    </div >

  );
}
