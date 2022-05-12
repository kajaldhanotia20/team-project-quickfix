import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Navbar from "../Hotel/Navbar";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import backendServer from "../../webConfig";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [trial, setTrial] = useState("Hello");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [rewards, setRewards] = useState("");
  const [loyalty, setLoyalty] = useState("");

  const singleFileUploadHandler = () => {
    setTrial(selectedFile[0]);
    console.log("in upload");
    const data = new FormData();
    // If file selected
    if ({ selectedFile }) {
      console.log(selectedFile);
      data.append("profileImage", selectedFile, selectedFile.name);

      axios
        .post(`${backendServer}/images/upload`, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          console.log("image", response.data.location);

          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                console.log("File is too large.");
              } else {
                console.log(response.data); // If not the given file type
                console.log("File type not allowed");
              }
            } else {
              // Success
              // let fileName = response.data;
              // console.log("fileName", fileName);
              setImage(response.data.location);
            }
          }
        })
        .catch((error) => {
          // If another error
          console.log(error);
        });
    } else {
      // if file not selected throw error
      console.log("Please upload a file");
    }
  };

  useEffect(() => {
    axios
      .get(`${backendServer}/api/users/getUserById`, {
        params: { _id: "U01" },
      })
      .then((response) => {
        let data = response.data[0];
        console.log(data);
        setName(data.Customer_Name);
        setAddress(data.Customer_Address);
        setPhoneNumber(data.Phone_Number);
        setImage(data.Profile_Image);
        setRewards(data.Rewards);
        setLoyalty(data.Customer_Loyalty);
      });
  }, []);

  const handleSubmit = () => {
    updateProfile();
  };

  const updateProfile = () => {
    const dataObj = {
      Customer_Name: name,
      Customer_Address: address,
      Phone_Number: phoneNumber,
      Profile_Image: image,
    };
    axios
      .put(`${backendServer}/api/users/updateUserById`, dataObj, {
        params: { _id: "U01" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Grid container>
        <Grid item xs={6} md={4}>
          <Paper style={{ "box-shadow": "0 0 0 0" }}>
            <Container component="main" maxWidth="xs">
              {/* <CssBaseline /> */}
              <Box
                sx={{
                  marginTop: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box component="form" noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}></Grid>
                    <img src={image} alt="profile" />
                    <Grid container justifyContent="flex-end"></Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
            {/* </ThemeProvider> */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Paper style={{ "box-shadow": "0 0 0 0" }}>
            <Container component="main" maxWidth="xs">
              {/* <CssBaseline /> */}
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        autoComplete="address"
                        name="address"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="contact"
                        label="Phone Number"
                        name="contact"
                        autoComplete="contact"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <Box sx={{ fontWeight: "bold", m: 1 }}>
                          Rewards: {rewards}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <Box sx={{ fontWeight: "bold", m: 1 }}>
                          Loyalty: {loyalty}
                        </Box>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <input
                        type="file"
                        onChange={(e) => {
                          setSelectedFile(e.target.files[0]);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={singleFileUploadHandler}
                      >
                        Upload Image
                        <input type="file" hidden />
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        // sx={{ mt: 3, mb: 2 }}
                      >
                        Save
                      </Button>
                    </Grid>

                    <Grid container justifyContent="flex-end"></Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
            {/* </ThemeProvider> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
