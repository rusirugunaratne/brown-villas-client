import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { ButtonGroup } from "@mui/material";

export default function AddStock({
  open,
  handleClose,
  addStock,
  values,
  handleInputChange,
}) {
  const [type, setType] = React.useState("yield");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new stock to the store. You can update the quantity in the
            update panel.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            name='itemName'
            label='Item Name'
            fullWidth
            variant='standard'
            value={values.itemName}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin='dense'
            name='itemCode'
            label='Item Code'
            fullWidth
            variant='standard'
            value={values.itemCode}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin='dense'
            name='itemQuantity'
            label='Item Quantity'
            type='number'
            fullWidth
            variant='standard'
            value={values.itemQuantity}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin='dense'
            name='itemUOM'
            label='Item UOM'
            fullWidth
            variant='standard'
            value={values.itemUOM}
            onChange={handleInputChange}
          />
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            <Button
              variant={type === "raw" ? "contained" : "outlined"}
              onClick={() => {
                setType("raw");
                values.itemType = "raw";
              }}
            >
              Row Materials and Resource
            </Button>
            <Button
              variant={type === "yield" ? "contained" : "outlined"}
              onClick={() => {
                setType("yield");
                values.itemType = "yield";
              }}
            >
              Yield
            </Button>
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button
            startIcon={<AddIcon />}
            variant='contained'
            onClick={() => addStock(values)}
          >
            Add to Stock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
