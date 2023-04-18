import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import AddStock from "./AddStock";
import useForm from "../../hooks/useForm";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import UpdateStock from "./UpdateStock";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

function UpdateStockQuantity() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("yield");
  const [status, setStatus] = useState("received");

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.stock)
      .fetch()
      .then((res) => {
        setItems(res.data);
      });
  }, []);

  const getFreshModel = () => ({
    itemName: "",
    itemCode: "",
    itemQuantity: 0,
    itemUOM: "Unit",
    type: "yield",
  });

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (row) => {
    console.log("open clicked");
    console.log(row.original, "original");
    setValues(row.original);
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close clicked");
    setOpen(false);
  };

  const updateStock = (stock) => {
    console.log(stock);
    setOpen(false);
    createAPIEndpoint(ENDPOINTS.stock)
      .put(stock._id, stock)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  const [data, setData] = useState(
    items.filter((item) => {
      return item.itemType === "raw";
    })
  );

  const setRowMaterials = () => {
    setData(
      items.filter((item) => {
        return item.itemType === "raw";
      })
    );
    console.log(data);
  };

  const setYield = () => {
    setData(
      items.filter((item) => {
        return item.itemType === "yield";
      })
    );
    console.log(data);
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
        accessorKey: "itemQuantity",
        header: "Item Quantity",
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
              onClick={() => handleClickOpen(row)}
              variant='contained'
              color='secondary'
              startIcon={<PublishedWithChangesIcon />}
            >
              Update
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
        <UpdateStock
          open={open}
          handleClose={handleClose}
          updateStock={updateStock}
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
              variant={status === "received" ? "contained" : "outlined"}
              onClick={() => setStatus("received")}
            >
              Received Stock
            </Button>
            <Button
              variant={status === "dispatched" ? "contained" : "outlined"}
              onClick={() => setStatus("dispatched")}
            >
              Dispatched Stock
            </Button>
          </ButtonGroup>
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
          </ButtonGroup>
          <MaterialReactTable
            columns={columns}
            data={items?.filter((stock) => {
              return stock.itemType === type && stock.itemStatus === status;
            })}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default UpdateStockQuantity;
