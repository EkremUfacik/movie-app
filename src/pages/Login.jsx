import Box from "@mui/material/Box";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signUpWithGoogle } from "../auth/firebase";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleProvider = () => {
    signUpWithGoogle(navigate, "Logged");
  };

  return (
    <Box display="flex" align="center" sx={{ height: "calc(100vh - 64px)" }}>
      <Box
        width="60vw"
        height="100%"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <img
          src="https://picsum.photos/1600/900"
          width="100%"
          height="100%"
          alt=""
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Box
        component="form"
        onSubmit={login}
        px={{ xs: 12, md: 3 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "40%" },
          gap: "2rem",
          justifyContent: "center",
          background: "#D5D977",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <TextField
          onChange={(e) => setLoginEmail(e.target.value)}
          type="email"
          id="email"
          label="Email"
          variant="filled"
          required
        />
        <TextField
          onChange={(e) => setLoginPassword(e.target.value)}
          type="password"
          id="password"
          label="Password"
          variant="filled"
          required
        />
        <Button
          type="submit"
          startIcon={<FingerprintIcon />}
          variant="contained"
          sx={{ width: "8rem", mx: "auto" }}
        >
          LogIn
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

export default Login;
