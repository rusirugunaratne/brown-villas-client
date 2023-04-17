import InventoryIcon from "@mui/icons-material/Inventory";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        marginTop={-5}
      >
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <Typography variant='h2'>Stock Management</Typography>
          <Button
            onClick={() => navigate("/manageStock")}
            variant='contained'
            startIcon={<InventoryIcon />}
          >
            Manage Stock Items
          </Button>
          <Button
            onClick={() => navigate("/updateStock")}
            variant='contained'
            startIcon={<ManageHistoryIcon />}
          >
            Update Stock Quantity
          </Button>
          <Button
            onClick={() => navigate("/stockReport")}
            variant='contained'
            startIcon={<AssessmentIcon />}
          >
            Stock Report
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
