import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROUTES } from "./constants/routes";
import HomePage from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import DatasetUploadPage from "./pages/DatasetUploadPage";
import Dashboard from "./pages/admin/Dashboard";
import DatasetList from "./pages/Datasets";
import OrdersList from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ORDER_CREATE} element={<OrderPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Admin-only: these call endpoints that require an Admin JWT */}
        <Route
          path={ROUTES.DATASET_UPLOAD}
          element={<ProtectedRoute><DatasetUploadPage /></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path={ROUTES.DATASETS}
          element={<ProtectedRoute><DatasetList /></ProtectedRoute>}
        />
        <Route
          path={ROUTES.ORDERS}
          element={<ProtectedRoute><OrdersList /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
