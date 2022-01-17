import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import "./Postcard.scss";

function Postcard(props) {
  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="Postcard">
      <Card>
        {!loaded && <div className="imgPlaceholder skeleton"></div>}
        <CardMedia
          component="img"
          minHeight="140"
          image={props.imgUrl}
          alt={props.imgTitle}
          style={loaded ? {} : { display: "none" }}
          onLoad={() => setLoaded(true)}
        />
        <CardContent>
          {!loaded && <div className="skeleton-text skeleton"></div>}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={loaded ? {} : { display: "none" }}
          >
            {props.imgTitle}
          </Typography>

          {!loaded && <div className="skeleton-text skeleton"></div>}
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={loaded ? {} : { display: "none" }}
          >
            {props.imgDate}
          </Typography>
          {!loaded && <div className="skeleton-text skeleton"></div>}
          {!loaded && <div className="skeleton-text skeleton"></div>}
          {!loaded && <div className="skeleton-text skeleton"></div>}
          <Typography
            variant="body2"
            color="text.secondary"
            style={loaded ? {} : { display: "none" }}
          >
            {isReadMore
              ? props.imgDescription.slice(0, 300)
              : props.imgDescription}
            <span onClick={toggleReadMore} className="read-or-hide">
              {isReadMore ? "...read more" : " show less"}
            </span>
          </Typography>
        </CardContent>
        <CardActions className="icons">
          <div
            className={`heart ${liked ? "is-active" : ""}`}
            onClick={() => {
              setLiked((prev) => {
                return !prev;
              });
            }}
          ></div>
          <IconButton aria-label="share">
            <ShareIcon
              onClick={() => {
                navigator.clipboard.writeText(props.imgUrl);
                props.snackbarOpen(true);
              }}
              sx={{ fontSize: 30 }}
            />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default Postcard;
