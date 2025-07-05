import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  isValidUrl,
  isValidValidityPeriod,
  isValidShortCodeFormat,
} from "../utils/validators";
import {
  getUniqueShortCode,
  isValidCustomShortCode,
  reserveShortCode,
} from "../utils/shortCodeGenerator";
import { log } from "../utils/loggerMiddleware";

const MAX_URLS = 5;

const Home = () => {
  const [entries, setEntries] = useState([
    { longUrl: "", validity: "", shortcode: "", result: null, error: "" },
  ]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    newEntries[index].error = "";
    setEntries(newEntries);
  };

  const handleAddEntry = () => {
    if (entries.length < MAX_URLS) {
      setEntries([
        ...entries,
        { longUrl: "", validity: "", shortcode: "", result: null, error: "" },
      ]);
    }
  };

  const handleShorten = () => {
    const updatedEntries = entries.map((entry) => {
      const { longUrl, validity, shortcode } = entry;
      if (!isValidUrl(longUrl)) {
        return { ...entry, error: "Invalid URL" };
      }
      if (validity && !isValidValidityPeriod(validity)) {
        return { ...entry, error: "Validity must be a positive integer" };
      }
      if (shortcode && !isValidShortCodeFormat(shortcode)) {
        return {
          ...entry,
          error: "Shortcode must be alphanumeric (max 10 chars)",
        };
      }

      let finalCode;
      if (shortcode) {
        if (!isValidCustomShortCode(shortcode)) {
          return { ...entry, error: "Shortcode already in use" };
        }
        finalCode = shortcode;
        reserveShortCode(finalCode);
      } else {
        finalCode = getUniqueShortCode();
      }

      const minutes = validity ? parseInt(validity) : 30;
      const now = new Date();
      const expiry = new Date(now.getTime() + minutes * 60000);

      const result = {
        originalUrl: longUrl,
        shortUrl: `http://localhost:3000/${finalCode}`,
        createdAt: now.toISOString(),
        expiresAt: expiry.toISOString(),
      };

      log(
        `Shortened URL: ${longUrl} to ${result.shortUrl} (expires at ${result.expiresAt})`
      );

      const previous = JSON.parse(
        localStorage.getItem("shortenedUrls") || "[]"
      );
      localStorage.setItem(
        "shortenedUrls",
        JSON.stringify([
          ...previous,
          {
            ...result,
            shortcode: finalCode,
            clicks: [],
          },
        ])
      );

      return { ...entry, result, error: "" };
    });

    setEntries(updatedEntries);

    if (updatedEntries.every((e) => !e.error)) {
      setSnackbar({
        open: true,
        message: "URLs shortened successfully!",
        severity: "success",
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        URL Shortener
      </Typography>

      {entries.map((entry, index) => (
        <Paper
          key={index}
          sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}
          elevation={3}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Long URL"
                fullWidth
                value={entry.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                error={!!entry.error && !isValidUrl(entry.longUrl)}
                helperText={
                  entry.error && !isValidUrl(entry.longUrl) ? entry.error : ""
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Validity (mins)"
                fullWidth
                type="number"
                value={entry.validity}
                onChange={(e) =>
                  handleChange(index, "validity", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={entry.shortcode}
                onChange={(e) =>
                  handleChange(index, "shortcode", e.target.value)
                }
              />
            </Grid>
            {entry.result && (
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Shortened URL:</strong>{" "}
                  <a
                    href={entry.result.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.result.shortUrl}
                  </a>
                </Typography>
                <Typography variant="body2">
                  <strong>Expires at:</strong>{" "}
                  {new Date(entry.result.expiresAt).toLocaleString()}
                </Typography>
              </Grid>
            )}
            {entry.error && (
              <Grid item xs={12}>
                <Alert severity="error">{entry.error}</Alert>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          onClick={handleAddEntry}
          disabled={entries.length >= MAX_URLS}
        >
          Add More
        </Button>
        <Button variant="contained" onClick={handleShorten} color="primary">
          Shorten All
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
3;
