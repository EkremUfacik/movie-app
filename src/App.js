import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import PrivateRouter from "./router/PrivateRouter";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  console.log(isDark);

  return (
    <div className={isDark ? "dark" : "light"}>
      <AuthProvider>
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <ToastContainer hideProgressBar={true} autoClose={3000} />

        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="details/:id" element={<PrivateRouter />}>
            <Route path="" element={<MovieDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
