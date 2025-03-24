import { useState, useEffect } from "react";

import { getProducts, addCart } from "../utility/userApi";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import Cart from "../components/Cart";
import OrderForm from "../components/OrderForm";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function ProductPage() {
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
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [loadingListState, setLoadingListState] = useState([]);

  useEffect(() => {
    (async function () {
      setIsScreenLoading(true);
      try {
        const { products, pagination } = await getProducts(currentPage);
        setProducts(products);
        setPageInfo(pagination);
      } catch (error) {
      } finally {
        setIsScreenLoading(false);
      }
    })();
  }, [currentPage]);

  function handleOpenProductModal(product) {
    setTempProduct(product);
    setIsOpenProductModal(true);
  }

  async function handleAddCart(product_id, qty) {
    setLoadingListState((prev) => [...prev, product_id]);
    const cartItem = { product_id, qty };
    try {
      await addCart(cartItem);
      setCartState({ isChange: true });
    } catch (error) {
    } finally {
      setLoadingListState((prev) => prev.filter((item) => item !== product_id));
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex">
              <h2 className="me-auto">商品列表</h2>
            </div>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col">圖片</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">價格</th>

                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="img-fluid"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>
                      <div>
                        <del>原價 {product.origin_price}元</del>
                      </div>
                      <h2 className="display-5">特價 {product.price}元</h2>
                    </td>
                    <td>
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-primary me-1"
                      >
                        查看更多
                      </Link>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleAddCart(product.id, 1)}
                        disabled={loadingListState.includes(product.id)}
                      >
                        加到購物車
                        {loadingListState.includes(product.id) && (
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* pagination */}
      <Pagination pageInfo={pageInfo} setCurrentPage={setCurrentPage} />

      {/* {product modal} */}
      {/* <ProductModal
        isOpen={isOpenProductModal}
        setIsOpen={setIsOpenProductModal}
        tempProduct={tempProduct}
        handleAddCart={handleAddCart}
        setCartState={setCartState}
      /> */}

      {/* <OrderForm setCartState={setCartState} /> */}

      {/* Screen Loading*/}
      {isScreenLoading && <Loading />}
    </>
  );
}

export default ProductPage;
