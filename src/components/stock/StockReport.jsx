import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import AddStock from "./AddStock";
import useForm from "../../hooks/useForm";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";

function StockReport() {
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

  const addStock = (stock) => {
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
        accessorKey: "itemUOM",
        header: "Item UOM",
      },
      {
        accessorKey: "itemQuantity",
        header: "Item Quantity",
      },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

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
            <Button onClick={() => setRowMaterials()}>
              Row Materials and Resource
            </Button>
            <Button onClick={() => setYield()}>Yield</Button>
            <Button
              onClick={() => handleClickOpen()}
              variant='contained'
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </ButtonGroup>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection
            positionToolbarAlertBanner='bottom'
            renderTopToolbarCustomActions={({ table }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  color='primary'
                  //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Export All Data
                </Button>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  //export all rows, including from the next page, (still respects filtering and sorting)
                  onClick={() =>
                    handleExportRows(table.getPrePaginationRowModel().rows)
                  }
                  startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Export All Rows
                </Button>
                <Button
                  disabled={table.getRowModel().rows.length === 0}
                  //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                  onClick={() => handleExportRows(table.getRowModel().rows)}
                  startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Export Page Rows
                </Button>
                <Button
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  //only export selected rows
                  onClick={() =>
                    handleExportRows(table.getSelectedRowModel().rows)
                  }
                  startIcon={<FileDownloadIcon />}
                  variant='contained'
                >
                  Export Selected Rows
                </Button>
              </Box>
            )}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default StockReport;
