import React from "react";
import { Grid, TextField, Typography, Alert, Box } from "@mui/material";

const URLForm = ({ index, data, onChange }) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        URL #{index + 1}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Original Long URL"
            variant="outlined"
            fullWidth
            value={data.longUrl}
            onChange={(e) => handleChange("longUrl", e.target.value)}
            error={!!data.error && data.error.toLowerCase().includes("url")}
            helperText={
              data.error && data.error.toLowerCase().includes("url")
                ? data.error
                : ""
            }
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            label="Validity (in minutes)"
            type="number"
            variant="outlined"
            fullWidth
            value={data.validity}
            onChange={(e) => handleChange("validity", e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField
            label="Custom Shortcode"
            variant="outlined"
            fullWidth
            value={data.shortcode}
            onChange={(e) => handleChange("shortcode", e.target.value)}
          />
        </Grid>

        {data.result && (
          <Grid item xs={12}>
            <Typography variant="body2">
              <strong>Short URL:</strong>{" "}
              <a
                href={data.result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.result.shortUrl}
              </a>
              <br />
              <strong>Expires at:</strong>{" "}
              {new Date(data.result.expiresAt).toLocaleString()}
            </Typography>
          </Grid>
        )}

        {data.error && !data.error.toLowerCase().includes("url") && (
          <Grid item xs={12}>
            <Alert severity="error">{data.error}</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default URLForm;
