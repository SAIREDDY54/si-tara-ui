import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Stack,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Box,
  StepButton
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses
} from "@mui/material/StepConnector";
import Axios from "axios";
import random from 'random-key-generator';
import step1 from './img/step1.svg';
import step2 from './img/step2.svg';
import step3 from './img/step3.svg';
import step4 from './img/step4.svg';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18
  },
  // [`&.${stepConnectorClasses.active}`]: {
  //   [`& .${stepConnectorClasses.line}`]: {
  //     backgroundColor: "#2364cc"
  //   }
  // },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#2364cc"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#2364cc",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2364cc"
  })
}));


function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <img src={step1} style={{ width: '1.5rem' }} />,
    2: <img src={step2} style={{ width: '1.5rem' }} />,
    3: <img src={step3} style={{ width: '1.5rem' }} />,
    4: <img src={step4} style={{ width: '1.5rem' }} />
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];



const MainStepper = () => {
  const interfaceLabels = [{ name: "USB" }, { name: "BLE" }, { name: "JTag" }, { name: "WIFI" }];
  const cloudLabels = [{ name: "S3" }, { name: "EC2" }, { name: "DATALAKE" }, { name: "Beanstalk" }];
  const databaseLabels = [{ name: "MySQL" }, { name: "MongoDB" }, { name: "DynamoDB" }, { name: "PostgreSQL" }];
  const deviceLabels = [{ name: "Android" }, { name: "iOS" }];
  const [interfaces, setInterfaces] = React.useState(new Set());
  const [cloud, setCloud] = React.useState(new Set());
  const [database, setDatabase] = React.useState(new Set());
  const [device, setDevice] = React.useState(new Set());
  const [activeStep, setActiveStep] = React.useState(0);
  const [isGenerated, setIsGenerated] = React.useState("no");
  const [data, setData] = React.useState(null);
  const [completed, setCompleted] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState('');
  const [cloudasset, setCloudAsset] = React.useState([]);
  const [interfaceasset, setInterfaceAsset] = React.useState([]);
  const [databaseasset, setDatabaseAsset] = React.useState([]);
  const [deviceasset, setDeviceAsset] = React.useState([]);
  // const []

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const combinedData = [...interfaceasset, ...cloudLabels, ...databaseLabels, ...deviceLabels];

  // interfaceasset.forEach((chip, index) => {
  //   // chip.id = index + 1;
  //   console.log(chip, index)
  // })

  // cloudLabels.forEach((chip, index) => {
  //   chip.id = index + 1;
  // })

  // databaseLabels.forEach((chip, index) => {
  //   chip.id = index + 1;
  // })

  // deviceLabels.forEach((chip, index) => {
  //   chip.id = index + 1;
  // })

  // console.log("option selected is", selectedOption)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleFinish = () => {
    setActiveStep(4)
  }

  // const interfaceFilteredLabels = combinedData.filter(label => label.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && interfaceLabels.includes(label));

  // const cloudFilteredLabels = combinedData.filter(label => label.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && cloudLabels.includes(label));

  // const databaseFilteredLabels = combinedData.filter(label => label.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && databaseLabels.includes(label));

  // const deviceFilteredLabels = combinedData.filter(label => label.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && deviceLabels.includes(label));

  const handleClickChip = (step, chipToAppend) => () => {
    step === "interfaces"
      ? setInterfaceAsset((ifr) => [...ifr, chipToAppend])
      : step === "cloud"
        ? setCloudAsset((cld) => new Set([...cld, chipToAppend]))
        : step === "database"
          ? setDatabaseAsset((dbs) => new Set([...dbs, chipToAppend]))
          : setDeviceAsset((dev) => new Set([...dev, chipToAppend]));
  };

  const handleDeleteChip = (step, chipToDelete) => () => {
    step === "interfaces"
      ? setInterfaceAsset((chips) => Array.from(chips).filter((chip) => chip !== chipToDelete))
      : step === "cloud"
        ? setCloud((chips) => Array.from(chips).filter((chip) => chip !== chipToDelete))
        : step === "database"
          ? setDatabase((chips) => Array.from(chips).filter((chip) => chip !== chipToDelete))
          : setDevice((chips) => Array.from(chips).filter((chip) => chip !== chipToDelete));
  };

  function sendDataDB() {
    Axios.post("http://localhost:8080/addData", {
      "interfaces": (Array.from(interfaces).length > 0) ? Array.from(interfaces) : "",
      "cloud": (Array.from(cloud).length > 0) ? Array.from(cloud) : "",
      "DBAssets": (Array.from(database).length > 0) ? Array.from(database) : "",
      "device": (Array.from(device).length > 0) ? Array.from(device) : "",
      "sessionId": random.getRandom(20, 'TARA', '@', 'front'),
      "email": "sai@in.bosch.com",
      "methodologies": selectedOption
    }, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } })

    var timer = setInterval(function () {
      getStatus(timer)
    }, 1000);
  }

  function getStatus(timer) {
    Axios.get('http://localhost:8080/checkStatus')
      .then(
        res => {
          if (res.data === "Completed") {
            clearInterval(timer)
            setData(res.data)
          }
        })
  }

  function GetAssets() {
      Axios.get("http://localhost:8080/getAssets")
        .then( res => {
          setCloudAsset(res.data.cloud);
          setInterfaceAsset(res.data.interfaces)
        })
  }

  return isGenerated === "yes" ? (

    <Stack sx={{ width: "100%" }} spacing={4}>
      <React.Fragment>
        <Stack direction="column" alignItems="center" justifyContent="center">
          {data === "Completed" ? (
            <>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                TARA Sheet Generated
              </Typography>
              <Box style={{ display: 'flex', margin: "24px 0px" }}>
                <Typography style={{ fontSize: 14, marginTop: 10 }}>
                  kindly check your email
                </Typography>
              </Box>
              <Button variant="contained" style={{ borderRadius: 0, margin: "20px 0px" }} onClick={() => window.location.reload()}>
                Home
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                TARA Sheet Generating
              </Typography>
              <Box style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "24px 0px" }}>
                <Typography style={{ fontSize: 14, marginTop: 10, marginBottom: 20 }}>
                  please wait until the process
                </Typography>
                <CircularProgress />
              </Box>
            </>
          )
          }

        </Stack>
      </React.Fragment>
    </Stack>
  ) : (
    <Stack sx={{ width: "100%" }} spacing={4}>
      
      <Stepper
        activeStep={activeStep}
        nonLinear
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <>{activeStep === 0 ? (
        <React.Fragment>
          
          {/* {console.log(interfaceasset)} */}
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Stack direction="row" marginLeft="20px">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Interfaces and Protocols
              </Typography>
              <input type="text" placeholder="Search for a chip..." onChange={handleSearch} style={{ marginLeft: "20px" }} />
              
            </Stack>
            <>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                style={{ margin: "30px 0px" }}>
                <GetAssets />  
                {interfaceasset.map((chip) => (
                  
                  <Chip
                    key={chip.id}
                    label={chip}
                    color={interfaceasset.includes(chip) ? "primary" : "default"}
                    onClick={handleClickChip("interfaces", chip)}
                    onDelete={
                      interfaceasset.includes(chip)
                        ? handleDeleteChip("interfaces", chip)
                        : ""
                    }
                    style={{ marginTop: 10 }}
                  />

                ))}
              </Stack>
            </>

            <Stack direction="row" alignItems="center">
              <Button
                onClick={handleNext}
                variant="contained"
                style={{ borderRadius: 0 }}
              // disabled={interfaces.length <= 0}
              >
                Next
              </Button>
              <Button
                onClick={handleFinish}
                variant="contained"
                style={{ borderRadius: 0, margin: '5px' }}
              // disabled={device.length <= 0}
              >
                Finish
              </Button>
            </Stack>
          </Stack>
        </React.Fragment>
      ) : activeStep === 1 ? (
        <React.Fragment>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Stack direction="row" marginLeft="20px">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Cloud Selection
              </Typography>
              <input type="text" placeholder="Search for a chip..." onChange={handleSearch} style={{ marginLeft: "20px" }} />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              style={{ margin: "30px 0px" }}>
              {Array.from(cloudasset).map(chip => (
                <Chip
                  key={chip}
                  label={chip}
                  color={Array.from(cloudasset).includes(chip) ? "primary" : "default"}
                  onClick={handleClickChip("cloud", chip)}
                  onDelete={
                    Array.from(cloudasset).includes(chip)
                      ? handleDeleteChip("cloud", chip)
                      : ""
                  }
                  style={{ marginTop: 10 }}
                />

              ))}
            </Stack>

            <Stack direction="row" alignItems="center">
              <Button onClick={handleBack}>Back</Button>
              <Button
                onClick={handleFinish}
                variant="contained"
                style={{ borderRadius: 0, margin: '5px' }}
              // disabled={device.length <= 0}
              >
                Finish
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                style={{ borderRadius: 0 }}
              // disabled={cloud.length <= 0}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </React.Fragment>
      ) : activeStep === 2 ? (
        <React.Fragment>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Stack direction="row" marginLeft="20px">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Select Database
              </Typography>
              <input type="text" placeholder="Search for a chip..." onChange={handleSearch} style={{ marginLeft: "20px" }} />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              style={{ margin: "30px 0px" }}>
              {Array.from(databaseasset).map(chip => (
                <Chip
                  key={chip}
                  label={chip}
                  color={Array.from(databaseasset).includes(chip) ? "primary" : "default"}
                  onClick={handleClickChip("database", chip)}
                  onDelete={
                    Array.from(databaseasset).includes(chip)
                      ? handleDeleteChip("database", chip)
                      : ""
                  }
                  style={{ marginTop: 10 }}
                />

              ))}
            </Stack>
            <Stack direction="row" alignItems="center">
              <Button onClick={handleBack}>Back</Button>
              <Button
                onClick={handleFinish}
                variant="contained"
                style={{ borderRadius: 0, margin: '5px' }}
              // disabled={device.length <= 0}
              >
                Finish
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                style={{ borderRadius: 0, margin: '5px' }}
              // disabled={database.length <= 0}
              >
                Next
              </Button>

            </Stack>
          </Stack>
        </React.Fragment>
      ) : activeStep === 3 ? (
        <React.Fragment>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Stack direction="row" marginLeft="20px">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Select Device
              </Typography>
              <input type="text" placeholder="Search for a chip..." onChange={handleSearch} style={{ marginLeft: "20px" }} />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              style={{ margin: "30px 0px" }}>
              {Array.from(deviceasset).map(chip => (
                <Chip
                  key={chip}
                  label={chip}
                  color={Array.from(deviceasset).includes(chip) ? "primary" : "default"}
                  onClick={handleClickChip("device", chip)}
                  onDelete={
                    Array.from(deviceasset).includes(chip)
                      ? handleDeleteChip("device", chip)
                      : ""
                  }
                  style={{ marginTop: 10 }}
                />

              ))}
            </Stack>
            <Stack direction="row" alignItems="center">
              <Button onClick={handleBack}>Back</Button>
              <Button
                onClick={handleFinish}
                variant="contained"
                style={{ borderRadius: 0 }}
              // disabled={device.length <= 0}
              >
                Finish
              </Button>
            </Stack>
          </Stack>
        </React.Fragment>
      ) : activeStep === 4 ? (
        <React.Fragment>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Stack direction="column" style={{ width: "100%", height: "100%", overflowY: 'auto' }} >
              <Typography
                variant="h5"
                style={{ fontWeight: "bold", marginBottom: 12 }}
              >
                TARA sheet will be generated for
              </Typography>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="Attack Potential"
                  checked={selectedOption === 'Attack Potential'}
                  onChange={handleOptionChange}
                />
                Attack Potential
              </label>

              <label>
                <input
                  type="radio"
                  name="options"
                  value="Likelihood Estimation"
                  checked={selectedOption === 'Likelihood Estimation'}
                  onChange={handleOptionChange}
                />
                Likelihood Estimation
              </label>
              {Array.from(interfaces).length === 0 ? "" : <><Typography
                style={{ fontWeight: "bold", marginBottom: 6, fontSize: 14 }}
              >
                Interfaces and Protocols
              </Typography>
                <Stack direction="row" spacing={1} flexWrap='wrap' style={{ marginBottom: 16 }}>
                  {Array.from(interfaces).map((chip) => (
                    <Chip
                      label={chip}
                      color={"primary"}
                      size="small"
                      // onClick={handleClickChip("interfaces", chip)}
                      onDelete={handleDeleteChip("interfaces", chip)}
                      style={{ marginTop: 5 }}
                    />
                  ))}
                </Stack></>}

              {Array.from(cloud).length === 0 ? "" : <><Typography
                style={{ fontWeight: "bold", marginBottom: 6, fontSize: 14 }}
              >
                Cloud
              </Typography>
                <Stack direction="row" spacing={1} flexWrap='wrap' style={{ marginBottom: 16 }}>
                  {Array.from(cloud).map((chip) => (
                    <Chip
                      label={chip}
                      color={"primary"}
                      size="small"
                      // onClick={handleClickChip("cloud", chip)}
                      onDelete={handleDeleteChip("cloud", chip)}
                      style={{ marginTop: 5 }}
                    />
                  ))}
                </Stack></>}

              {Array.from(database).length === 0 ? "" : <><Typography
                style={{ fontWeight: "bold", marginBottom: 6, fontSize: 14 }}
              >
                Database
              </Typography>
                <Stack direction="row" spacing={1} flexWrap='wrap' style={{ marginBottom: 16 }}>
                  {Array.from(database).map((chip) => (
                    <Chip
                      label={chip}
                      color={"primary"}
                      size="small"
                      // onClick={handleClickChip("database", chip)}
                      onDelete={handleDeleteChip("database", chip)}
                      style={{ marginTop: 5 }}
                    />
                  ))}
                </Stack></>}

              {Array.from(device).length === 0 ? "" : <><Typography
                style={{ fontWeight: "bold", marginBottom: 6, fontSize: 14 }}
              >
                Device
              </Typography>
                <Stack direction="row" spacing={1} flexWrap='wrap' style={{ marginBottom: 16 }}>
                  {Array.from(device).map((chip) => (
                    <Chip
                      label={chip}
                      color={"primary"}
                      size="small"
                      // onClick={handleClickChip("device", chip)}
                      onDelete={handleDeleteChip("device", chip)}
                      style={{ marginTop: 5 }}
                    />
                  ))}
                </Stack></>}

            </Stack>

            <Stack direction="row" alignItems="center" margin={"20px 0px"}>
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                style={{ borderRadius: 0 }}
                onClick={() => { setIsGenerated("yes"); sendDataDB(); }}
                disabled={(Array.from(interfaces).length === 0) && (Array.from(database).length === 0) && (Array.from(device).length === 0) && (Array.from(cloud).length === 0)}
              >
                Generate
              </Button>
            </Stack>
          </Stack>
        </React.Fragment>
      ) : (
        ""
      )}</>
    </Stack>
  );
};

export default MainStepper;
