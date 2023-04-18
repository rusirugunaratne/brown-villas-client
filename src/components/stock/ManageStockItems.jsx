import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import AddStock from "./AddStock";
import useForm from "../../hooks/useForm";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

function ManageStockItems() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("yield");

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.stock)
      .fetch()
      .then((res) => {
        console.log(res);
        setItems(res.data);
      });
  }, []);

  const deleteStock = (id) => {
    createAPIEndpoint(ENDPOINTS.stock)
      .delete(id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };
  const getFreshModel = () => ({
    itemName: "",
    itemCode: "",
    itemQuantity: 0,
    itemUOM: "Unit",
    itemType: "yield",
    itemStatus: "received",
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("open clicked");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close clicked");
    setOpen(false);
  };

  const addStock = (stock) => {
    stock.itemQuantity = parseInt(stock.itemQuantity);
    console.log("stock", stock);
    createAPIEndpoint(ENDPOINTS.stock)
      .post(stock)
      .then((res) => {
        console.log(res);
        items.push(stock);
        setOpen(false);
        setValues(getFreshModel());
        window.location.reload();
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "itemName",
        header: "Item Name",
      },
      {
        accessorKey: "itemCode",
        header: "Item Code",
      },
      {
        accessorKey: "itemUOM",
        header: "Item UOM",
      },
      {
        header: "Actions",
        Cell: ({ cell, row }) => {
          return (
            <Button
              onClick={() => deleteStock(row.original._id)}
              variant='contained'
              color='error'
              startIcon={<DeleteForeverIcon />}
            >
              Delete
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      {open ? (
        <AddStock
          open={open}
          handleClose={handleClose}
          addStock={addStock}
          values={values}
          handleInputChange={handleInputChange}
        />
      ) : (
        <></>
      )}

      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginTop={5}
      >
        <Stack direction={"column"}>
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            <Button
              variant={type === "raw" ? "contained" : "outlined"}
              onClick={() => setType("raw")}
            >
              Row Materials and Resource
            </Button>
            <Button
              variant={type === "yield" ? "contained" : "outlined"}
              onClick={() => setType("yield")}
            >
              Yield
            </Button>
            <Button
              onClick={() => handleClickOpen()}
              variant='contained'
              color='secondary'
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </ButtonGroup>
          <MaterialReactTable
            columns={columns}
            data={items?.filter((stock) => {
              return stock.itemType === type;
            })}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default ManageStockItems;
