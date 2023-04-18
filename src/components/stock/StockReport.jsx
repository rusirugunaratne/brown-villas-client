import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import AddStock from "./AddStock";
import useForm from "../../hooks/useForm";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";
import { ENDPOINTS, createAPIEndpoint } from "../../api";

function StockReport() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.stock)
      .fetch()
      .then((res) => {
        setItems(res.data);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        maxSize: 5,
      },
      {
        accessorKey: "itemName",
        header: "Item Name",
        maxSize: 5,
      },
      {
        accessorKey: "itemCode",
        header: "Item Code",
        maxSize: 5,
      },
      {
        accessorKey: "itemUOM",
        header: "Item UOM",
        maxSize: 5,
      },
      {
        accessorKey: "itemQuantity",
        header: "Item Quantity",
        maxSize: 5,
      },
      {
        accessorKey: "itemStatus",
        header: "Item Status",
        maxSize: 5,
      },
      {
        accessorKey: "itemType",
        header: "Item Type",
        maxSize: 5,
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
    csvExporter.generateCsv(items);
  };

  return (
    <>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        marginTop={5}
      >
        <Stack direction={"column"}>
          <MaterialReactTable
            columns={columns}
            data={items}
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
