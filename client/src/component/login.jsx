import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NativeSelect } from "@mui/material";
import { InputLabel } from "@mui/material";
import axios from "axios";
import React, {  useState } from "react";
import toast from "react-hot-toast";

import { VisuallyHiddenInput } from "../utils/StyledComponents";
import { bgGradient } from "../color/color";
import {server} from "../api/api";



import { useNavigate } from "react-router-dom";


const Login = ({setExist}) => {


 console.log(server);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const naviagte = useNavigate();


  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");


  const [email, setEmail] = useState("");
  const password = useInputValidation("");
  const [gender, setGender] = useState("Male");

  const avatar = useFileHandler("single");



  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
 
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
     
      const { data } = await axios.post(
        `${server}/auth/login`,
        {
          email:email,
          password: password.value,

        },
        config
      );
     
    
      localStorage.setItem("UPlay", JSON.stringify(data.data));
      setExist(data.data);
     
    
      toast.success(data.message, {
        id: toastId,
      });
   
      naviagte("/");
    } catch (error) {
      console.log(error);
      
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("email", email);
    
    formData.append("password", password.value);
    formData.append("gender",gender);
    
    console.log(formData);
    
   const toastId = toast.loading("Signing Up...");
   try{
    const { data } = await axios.post(`${server}/auth/signup`, formData);
    console.log(data);
    toast.success(data.message, {
      id: toastId,
    });
    naviagte("/");
   }catch(e){
      console.log(e);
    toast.error(e?.response?.data?.message || "Something Went Wrong", {
      id: toastId,
    }
    );
   }finally{
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 5000);
   }
    

  };

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}  className={`flex items-center min-h-[calc(100vh-73px)] p-2`}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
         
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />



                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                   <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

<InputLabel variant="standard" htmlFor="Gender">
     Gender
  </InputLabel>
  <NativeSelect
    defaultValue={gender}
  
    onChange={(e) => setGender(e.target.value)}
  >
    <option value={"Male"}>Male</option>
    <option value={"Female"}>Female</option>
  
  </NativeSelect>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>

                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                >
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
