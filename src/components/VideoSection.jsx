import { Box } from "@mui/material";

const VideoSection = ({ videoKey }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
        aspectRatio: "auto",
        margin: "auto",
      }}
    >
      <iframe
        style={{ width: "100%", height: "100%" }}
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
        title="YouTube video"
        allowFullScreen
      ></iframe>
    </Box>

    // <div className="w-10/12 md:w-3/5 mx-auto my-3">
    //   <div className="ratio ratio-16x9">
    //     <iframe
    //       className="rounded-xl"
    //       src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
    //       title="YouTube video"
    //       allowFullScreen
    //     ></iframe>
    //   </div>
    // </div>
  );
};

export default VideoSection;
