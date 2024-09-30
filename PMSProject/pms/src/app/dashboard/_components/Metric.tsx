import React from 'react';
import { Typography, Box } from '@material-ui/core';

export default function Metric({ value, label }) {
  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6" >
        {value}
      </Typography>
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
};
