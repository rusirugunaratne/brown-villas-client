import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "../common/Appbar";
import HomePage from "../stock/HomePage";
import ManageStockItems from "../stock/ManageStockItems";
import UpdateStockQuantity from "../stock/UpdateStockQuantity";
import StockReport from "../stock/StockReport";

export function Router() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/manageStock' element={<ManageStockItems />} />
        <Route path='/updateStock' element={<UpdateStockQuantity />} />
        <Route path='/stockReport' element={<StockReport />} />
      </Routes>
    </BrowserRouter>
  );
}
