import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const StatsTable = ({ clicks }) => {
  if (!clicks || clicks.length === 0) {
    return <Typography>No clicks recorded yet.</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Timestamp</strong>
            </TableCell>
            <TableCell>
              <strong>Referrer</strong>
            </TableCell>
            <TableCell>
              <strong>Location</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clicks.map((click, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(click.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>{click.referrer || "Direct"}</TableCell>
              <TableCell>{click.location || "Unknown"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
