import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { log } from "../utils/loggerMiddleware";

const Stats = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");
    setUrls(data);
    log(`Loaded ${data.length} shortened URLs for stats`);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        URL Shortener Statistics
      </Typography>

      {urls.length === 0 ? (
        <Typography align="center" color="textSecondary">
          No URLs have been shortened yet.
        </Typography>
      ) : (
        urls.map((url, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" flexDirection="column" width="100%">
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {url.shortUrl}
                  <Tooltip title="Open in new tab">
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: 8 }}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </a>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  → {url.originalUrl}
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={`Created: ${new Date(
                      url.createdAt
                    ).toLocaleString()}`}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`Expires: ${new Date(
                      url.expiresAt
                    ).toLocaleString()}`}
                    color="warning"
                  />
                  <Chip
                    label={`Clicks: ${url.clicks.length}`}
                    color="success"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {url.clicks.length === 0 ? (
                <Typography>No clicks recorded yet.</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Timestamp</TableCell>
                        <TableCell>Referrer</TableCell>
                        <TableCell>Location</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {url.clicks.map((click, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            {new Date(click.timestamp).toLocaleString()}
                          </TableCell>
                          <TableCell>{click.referrer}</TableCell>
                          <TableCell>{click.location}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default Stats;
