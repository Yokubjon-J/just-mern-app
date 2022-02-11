import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function LinearColor() {
  return (
    <Box sx={{height: "90vh",
      padding: "0 20px",
      mr: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",}}
    >
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={8}>
        <LinearProgress color="secondary" />
        <LinearProgress color="success" />
        <LinearProgress color="inherit" />
      </Stack>
    </Box>
  );
}