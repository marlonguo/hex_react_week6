import { createHashRouter } from "react-router-dom";
import FrontLayout from "../layouts/FrontLayout";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFound from "../pages/NotFound";
import Cart from "../components/Cart";
import HomePage from "../pages/HomePage";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
