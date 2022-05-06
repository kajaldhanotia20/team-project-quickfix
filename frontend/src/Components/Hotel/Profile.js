import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import backendServer from "../../webConfig";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [trial, setTrial] = useState("Hello");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amenities, setAmenities] = useState({
    breakfast: false,
    fitness_centre: false,
    swimming_pool: false,
    parking: false,
    allmeals: false,
  });
  const [image, setImage] = useState("");

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
      .get(`${backendServer}/api/hotels/getHotelById`, {
        params: { _id: "H01" },
      })
      .then((response) => {
        let data = response.data[0];
        console.log(data);
        setName(data.Hotel_name);
        setDescription(data.Description);
        setWorkingHours(data.Working_hours);
        setPhoneNumber(data.Phone_number);
        setLocation(data.Hotel_location);
        setImage(data.Profile_image);
        // setAmenities(data.Amenities);
        const temp = {};
        for (const ele in data.Amenities) {
          console.log("sd", data.Amenities[ele]);
          temp[data.Amenities[ele]] = true;
        }
        setAmenities(temp);
      });
  }, []);

  const handleSubmit = () => {
    updateProfile();
  };

  //   console.log(amenities);

  const updateProfile = () => {
    let temp = [];
    for (const key in amenities) {
      if (amenities[key] == true) {
        temp.push(key);
      }
    }
    const dataObj = {
      Hotel_name: name,
      Hotel_location: location,
      Description: description,
      Working_hours: workingHours,
      Phone_number: phoneNumber,
      Amenities: temp,
      Profile_image: image,
    };
    axios
      .put(`${backendServer}/api/hotels/updateHotelById`, dataObj, {
        params: { _id: "H01" },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log("am", amenities);
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
                        name="hotelName"
                        required
                        fullWidth
                        id="hotelName"
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
                        autoComplete="des"
                        name="des"
                        required
                        fullWidth
                        id="des"
                        label="Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="woorkingHours"
                        label="Working Hours"
                        name="workingHours"
                        autoComplete="workingHours"
                        value={workingHours}
                        onChange={(e) => {
                          setWorkingHours(e.target.value);
                        }}
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
                      <TextField
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        autoComplete="loaction"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Amenities :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={amenities?.breakfast ? true : false}
                            />
                          }
                          label="Daily Continental Breakfast"
                          value={amenities.breakfast}
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setAmenities({
                              ...amenities,
                              breakfast: e.target.checked,
                            });
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={amenities?.fitness_centre ? true : false}
                            />
                          }
                          label="Fitness Centre"
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setAmenities({
                              ...amenities,
                              fitness_centre: e.target.checked,
                            });
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={amenities?.swimming_pool ? true : false}
                            />
                          }
                          label="Swimming Pool/Jacuzzi"
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setAmenities({
                              ...amenities,
                              swimming_pool: e.target.checked,
                            });
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={amenities?.parking ? true : false}
                            />
                          }
                          label="Parking"
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setAmenities({
                              ...amenities,
                              parking: e.target.checked,
                            });
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={amenities?.allmeals ? true : false}
                            />
                          }
                          label="All Meals"
                          onChange={(e) => {
                            console.log(e.target.checked);
                            setAmenities({
                              ...amenities,
                              allmeals: e.target.checked,
                            });
                          }}
                        />
                      </FormGroup>
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
