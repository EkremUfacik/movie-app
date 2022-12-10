import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

export default function ActionAreaCard({ movies }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const movieDetail = (id) => {
    navigate(`details/${id}`);
    !user && toast.error("Please login to see details");
  };

  return (
    <Box
      className="movie-card"
      py={4}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        // marginTop: "2rem",
        // paddingBottom: "2rem",
        backgroundColor: "#d0e3b3",
      }}
    >
      {movies?.map((m, index) => {
        return (
          <Card
            className="card"
            key={index}
            sx={{ maxWidth: 345 }}
            onClick={() => movieDetail(m.id)}
          >
            <CardActionArea
              sx={{
                width: "300px",
                textAlign: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardMedia
                className="cardMedia"
                component="img"
                image={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${m.poster_path}`
                    : "https://media.comicbook.com/files/img/default-movie.png"
                }
                alt="movie"
                height="450px"
                // sx={{ width: "300px" }}
              />

              <CardContent
                className="card-content"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // gap: "1rem",
                  height: "7rem",
                  backgroundColor: "#c1c193ac",
                }}
              >
                <Typography gutterBottom variant="h6" component="p">
                  {m.original_title}
                </Typography>
                <Typography
                  className="average"
                  variant="body1"
                  color="secondary"
                  sx={{
                    backgroundColor: "lightblue",
                    padding: "5px",
                    height: "2rem",
                  }}
                >
                  {m.vote_average}
                </Typography>
              </CardContent>
              <Typography className="overview" sx={{ position: "absolute" }}>
                <Typography variant="h5" color="darkkhaki">
                  Review
                </Typography>
                {m.overview}
              </Typography>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
}
