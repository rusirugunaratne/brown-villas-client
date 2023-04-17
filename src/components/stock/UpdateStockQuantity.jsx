import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import AddStock from "./AddStock";
import useForm from "../../hooks/useForm";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import UpdateStock from "./UpdateStock";

function UpdateStockQuantity() {
  const items = [
    {
      itemName: "Fertilizer",
      itemCode: "1342R",
      itemUOM: "Kg",
      itemType: "yield",
      itemQuantity: 10,
    },
    {
      itemName: "Pesticide",
      itemCode: "3579T",
      itemUOM: "Litres",
      itemType: "raw",
      itemQuantity: 10,
    },
    {
      itemName: "Seed",
      itemCode: "2586M",
      itemUOM: "Units",
      itemType: "yield",
      itemQuantity: 10,
    },
    {
      itemName: "Herbicide",
      itemCode: "9635A",
      itemUOM: "Litres",
      itemType: "raw",
      itemQuantity: 10,
    },
    {
      itemName: "Fungicide",
      itemCode: "7410L",
      itemUOM: "Litres",
      itemType: "raw",
      itemQuantity: 20,
    },
    {
      itemName: "Plant Growth Regulator",
      itemCode: "4028C",
      itemUOM: "Litres",
      itemType: "yield",
      itemQuantity: 20,
    },
    {
      itemName: "Insecticide",
      itemCode: "6809P",
      itemUOM: "Units",
      itemType: "raw",
      itemQuantity: 20,
    },
    {
      itemName: "Fertilizer",
      itemCode: "1924S",
      itemUOM: "Kg",
      itemType: "yield",
      itemQuantity: 20,
    },
    {
      itemName: "Fertilizer",
      itemCode: "5381D",
      itemUOM: "Kg",
      itemType: "yield",
      itemQuantity: 20,
    },
    {
      itemName: "Herbicide",
      itemCode: "3197B",
      itemUOM: "Litres",
      itemType: "raw",
      itemQuantity: 20,
    },
  ];
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

  const handleClickOpen = () => {
    console.log("open clicked");
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close clicked");
    setOpen(false);
  };

  const updateStock = (stock) => {
    console.log(stock);
    setOpen(false);
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
              onClick={() => handleClickOpen()}
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
            <Button onClick={() => setRowMaterials()}>
              Row Materials and Resource
            </Button>
            <Button onClick={() => setYield()}>Yield</Button>
          </ButtonGroup>
          <MaterialReactTable columns={columns} data={data} />
        </Stack>
      </Stack>
    </>
  );
}

export default UpdateStockQuantity;
