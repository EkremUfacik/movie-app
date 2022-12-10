import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";

const MovieDetails = () => {
  const navigate = useNavigate();
  const MD_API_KEY = process.env.REACT_APP_MD_API_KEY;
  const { id } = useParams();
  const [details, setDetails] = useState("");
  const [videoKey, setVideoKey] = useState();
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${MD_API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${MD_API_KEY}`;

  const { title, poster_path, genres, overview, release_date } = details;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((err) => console.log(err));
    fetch(videoUrl)
      .then((res) => res.json())
      .then((data) => setVideoKey(data.results[0].key))
      .catch((err) => console.log(err));
  }, [url, videoUrl]);

  return (
    <Box className="movie-detail">
      <Typography variant="h4" align="center" pt={3}>
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          flexDirection: { xs: "column", md: "row" },
        }}
        px={5}
        py={3}
      >
        <Box sx={{ width: "35%", minWidth: "20rem", mx: "auto" }}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w1280${poster_path}`
                : "https://media.comicbook.com/files/img/default-movie.png"
            }
            alt=""
            width="100%"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6">
              <b>Genres: </b>
              {genres?.map((genre, index) => (
                <span key={index}>{genre.name} </span>
              ))}
            </Typography>
            <Typography variant="h6">
              <b>Overview:</b> {overview}
            </Typography>

            <Typography variant="h6">
              <b>Release Date: </b>
              {release_date}
            </Typography>

            {videoKey && <VideoSection videoKey={videoKey} />}

            <Button
              variant="outlined"
              sx={{ mt: "2rem" }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
