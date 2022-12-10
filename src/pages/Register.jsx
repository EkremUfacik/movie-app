import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, signUpWithGoogle } from "../auth/firebase";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const registerInitial = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  const [registerInfo, setRegisterInfo] = useState(registerInitial);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegisterInfo({ ...registerInfo, [id]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    const { name, surname, email, password } = registerInfo;
    const displayName = name + " " + surname;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: displayName });
      navigate("/");
      toast.success("Registered in successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleProvider = () => {
    signUpWithGoogle(navigate, "Registered");
  };

  return (
    <Box display="flex" sx={{}} align="center" height="calc(100vh - 64px)">
      <Box width="60vw" sx={{ display: { xs: "none", md: "block" } }}>
        <img
          src="https://picsum.photos/1600/900"
          width="100%"
          height="100%"
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box
        className="register-bg"
        component="form"
        onSubmit={register}
        px={{ xs: 12, md: 3 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "40%" },
          // height: "91.3vh",
          // minHeight: "100vh",
          // width: "100%",
          gap: "2rem",
          // alignItems: "center",
          justifyContent: "center",
          background: "#b7ce67",
        }}
      >
        <Typography variant="h4">Register</Typography>
        <TextField
          onChange={handleChange}
          type="text"
          id="name"
          value={registerInfo.value}
          label="Name"
          variant="filled"
          required
        />
        <TextField
          onChange={handleChange}
          type="text"
          id="surname"
          value={registerInfo.value}
          label="Surname"
          variant="filled"
          required
        />
        <TextField
          onChange={handleChange}
          type="email"
          id="email"
          value={registerInfo.value}
          label="Email"
          variant="filled"
          required
        />
        <TextField
          onChange={handleChange}
          type="password"
          id="password"
          value={registerInfo.value}
          label="Password"
          variant="filled"
          required
        />
        <Button
          type="submit"
          startIcon={<ContactPageIcon />}
          variant="contained"
          sx={{ width: "8rem", mx: "auto" }}
        >
          Register
        </Button>
        <Button
          type="button"
          startIcon={<GoogleIcon />}
          variant="outlined"
          sx={{ width: "16rem", mx: "auto" }}
          color="secondary"
          onClick={handleGoogleProvider}
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
