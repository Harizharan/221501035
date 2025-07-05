import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const URLCard = ({ result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy to clipboard", err);
    }
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: "#f0f4ff" }} elevation={3}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1976d2" }}>
          Shortened URL:
          <Box component="span" ml={1}>
            <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
              {result.shortUrl}
            </a>
            <Tooltip title="Open in new tab">
              <IconButton href={result.shortUrl} target="_blank">
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Typography>

        <Typography variant="body2" color="textSecondary" mt={1}>
          <strong>Original URL:</strong> {result.originalUrl}
        </Typography>

        <Typography variant="body2" mt={0.5}>
          <strong>Created At:</strong>{" "}
          {new Date(result.createdAt).toLocaleString()}
        </Typography>

        <Typography variant="body2">
          <strong>Expires At:</strong>{" "}
          {new Date(result.expiresAt).toLocaleString()}
        </Typography>
      </CardContent>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setCopied(false)}
        >
          Short URL copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default URLCard;
