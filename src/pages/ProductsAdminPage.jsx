import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserLogin } from "../utility/userApi";
import { getProducts } from "../utility/adminApi";

import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DeleteProductModal from "../components/DeleteProductModal";

export default function ProductsAdminPage() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
    if (token) {
      (async function () {
        try {
          await checkUserLogin();
        } catch (error) {
          navigate("/admin");
        }
      })();
    }
  }, []);

  const defaultModalState = {
    title: "",
    category: "",
    origin_price: "",
    price: "",
    unit: "",
    description: "",
    content: "",
    is_enabled: false,
    imageUrl: "",
    imagesUrl: [""],
  };

  const [tempProduct, setTempProduct] = useState(defaultModalState);

  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [productModalMode, setProductModalMode] = useState(null);
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async function () {
      const { products, pagination } = await getProducts(currentPage);

      setProducts(products);
      setPageInfo(pagination);
    })();
  }, [isOpenProductModal, isOpenDeleteModal, currentPage]);

  function handleOpenProductModal(mode, product) {
    setProductModalMode(mode);
    if (product.imagesUrl === undefined) {
      product.imagesUrl = [""];
    }
    setTempProduct(product);
    setIsOpenProductModal(true);
  }

  function handleOpenDeleteProductModal(product) {
    setTempProduct(product);
    setIsOpenDeleteModal(true);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex">
              <h2 className="me-auto">產品列表</h2>
              <button
                onClick={() =>
                  handleOpenProductModal("create", defaultModalState)
                }
                type="button"
                className="btn btn-primary mb-3"
              >
                建立新的產品
              </button>
            </div>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled > 0 ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary me-1"
                        onClick={() => handleOpenProductModal("edit", product)}
                      >
                        編輯
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleOpenDeleteProductModal(product)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* {Pagination} */}
            <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>

      {/* {product modal} */}
      <ProductModal
        isOpen={isOpenProductModal}
        setIsOpen={setIsOpenProductModal}
        productModalMode={productModalMode}
        tempProduct={tempProduct}
      />

      {/* {delete product modal} */}
      <DeleteProductModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        tempProduct={tempProduct}
      />
    </>
  );
}
