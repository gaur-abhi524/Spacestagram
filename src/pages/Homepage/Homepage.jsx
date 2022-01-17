import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LottieAnimation from "../../lottie";
import Navbar from "../../components/Navbar/Navbar";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Postcard from "../../components/postCard/Postcard";
import Snackbar from "@mui/material/Snackbar";
import "./Homepage.scss";

function Homepage() {
  const [apiData, setApiData] = useState([]);
  const [count, setCount] = useState(10);
  const [lastElement, setLastElement] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setCount((no) => no + 10);
      }
    })
  );

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const getData = async () => {
    setMoreLoading(true);
    const result = await axios
      .get(
        `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
      )
      .catch((err) => console.log(err));
    console.log(result.data);
    let all = new Set([...apiData, ...result.data]);
    setApiData([...all]);
    if (result.data.length > 0) {
      setLoading(false);
      setMoreLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <LottieAnimation />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="Homepage">
            <Snackbar
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              message="Link Copied!"
            />
            <ImageList variant="masonry" cols={isMobile ? 2 : 1} gap={100}>
              {apiData.map((item, i) => {
                return i === apiData.length - 1 && !moreLoading ? (
                  <div key={item.url} ref={setLastElement}>
                    <Postcard
                      imgUrl={item.url}
                      imgDate={item.date}
                      imgTitle={item.title}
                      imgDescription={item.explanation}
                      snackbarOpen={setOpen}
                    />
                  </div>
                ) : (
                  <ImageListItem key={item.url}>
                    <Postcard
                      imgUrl={item.url}
                      imgDate={item.date}
                      imgTitle={item.title}
                      imgDescription={item.explanation}
                      snackbarOpen={setOpen}
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </div>
          {moreLoading && <p className="text-center">loading...</p>}
        </>
      )}
    </>
  );
}

export default Homepage;
