import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useAuthContext } from "../context/AuthProvider";

const SearchMovies = ({ getMovies }) => {
  const inputMovie = useRef();
  const MD_API_KEY = process.env.REACT_APP_MD_API_KEY;
  const { user } = useAuthContext();

  const searchMovie = () => {
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MD_API_KEY}&query=${inputMovie.current.value}`;

    user || toast.error("Please login to the search");

    user &&
      (inputMovie.current.value
        ? getMovies(searchUrl)
        : toast.error("Please enter a value"));

    inputMovie.current.value = "";
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        backgroundColor: "#9dbb5c",
        py: "1rem",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search a movie"
        variant="outlined"
        size="small"
        inputRef={inputMovie}
      />
      <Button variant="outlined" onClick={searchMovie}>
        Search
      </Button>
    </Box>
  );
};

export default SearchMovies;
