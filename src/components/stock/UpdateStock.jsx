import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ButtonGroup } from "@mui/material";

export default function UpdateStock({
  open,
  handleClose,
  updateStock,
  values,
  handleInputChange,
}) {
  const [status, setStatus] = React.useState(values.itemStatus);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>Update stock in the store</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='itemQuantity'
            label='Quantity'
            fullWidth
            variant='standard'
            type='number'
            value={values.itemQuantity}
            onChange={handleInputChange}
          />
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            <Button
              variant={status === "received" ? "contained" : "outlined"}
              onClick={() => {
                values.itemStatus = "received";
                setStatus("received");
              }}
            >
              Received Stock
            </Button>
            <Button
              variant={status === "dispatched" ? "contained" : "outlined"}
              onClick={() => {
                values.itemStatus = "dispatched";
                setStatus("dispatched");
              }}
            >
              Dispatched Stock
            </Button>
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button
            startIcon={<ChangeCircleIcon />}
            variant='contained'
            onClick={() => updateStock(values)}
          >
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
