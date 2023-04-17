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

export default function UpdateStock({
  open,
  handleClose,
  updateStock,
  values,
  handleInputChange,
}) {
  const [type, setType] = React.useState("yield");
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>Update stock in the store</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='itemName'
            label='Quantity'
            fullWidth
            variant='standard'
            type='number'
            value={values.itemQuantity}
            onChange={handleInputChange}
          />
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
