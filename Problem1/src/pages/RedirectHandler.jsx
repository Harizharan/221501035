import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { log } from "../utils/loggerMiddleware";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const shortenedUrls = JSON.parse(
      localStorage.getItem("shortenedUrls") || "[]"
    );
    const entryIndex = shortenedUrls.findIndex((item) =>
      item.shortUrl.endsWith(shortcode)
    );

    if (entryIndex === -1) {
      setStatus("error");
      setMessage("Short URL not found.");
      log(`Shortcode ${shortcode} not found.`, "error");
      return;
    }

    const entry = shortenedUrls[entryIndex];
    const now = new Date();

    if (new Date(entry.expiresAt) < now) {
      setStatus("expired");
      setMessage("This link has expired.");
      log(`Shortcode ${shortcode} expired.`, "warn");
      return;
    }

    const clickLog = {
      timestamp: now.toISOString(),
      referrer: document.referrer || "Direct",
      location: "Unknown",
    };

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        clickLog.location = `${data.city}, ${data.country_name}`;
      })
      .catch(() => {
        log("Failed to fetch location", "warn");
      })
      .finally(() => {
        shortenedUrls[entryIndex].clicks.push(clickLog);
        localStorage.setItem("shortenedUrls", JSON.stringify(shortenedUrls));

        log(`Redirecting to ${entry.originalUrl} from shortcode ${shortcode}`);
        window.location.href = entry.originalUrl;
      });
  }, [shortcode]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      {status === "loading" && (
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Redirecting...
          </Typography>
        </Box>
      )}
      {status !== "loading" && (
        <Alert severity={status === "error" ? "error" : "warning"}>
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default RedirectHandler;
