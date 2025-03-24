import { useState, useEffect, useRef } from "react";

import { useParams } from "react-router-dom";

import { addCart, getProduct } from "../utility/userApi";

import Loading from "../components/Loading";

function ProductDetailPage() {
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id: product_id } = useParams();

  useEffect(() => {
    (async function () {
      setIsScreenLoading(true);
      try {
        const { product } = await getProduct(product_id);
        setProduct(product);
      } catch (error) {
      } finally {
        setIsScreenLoading(false);
      }
    })();
  }, []);

  async function handleAddCart(product_id) {
    setIsLoading(true);
    const cartItem = { product_id, qty: qtySelect };
    try {
      await addCart(cartItem);
      setCartState({ isChange: true });
    } catch (error) {
    } finally {
      setIsLoading(false);
      setQtySelect(1);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h5>產品名稱: {product.title}</h5>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="img-fluid"
                style={{ width: "200px" }}
              />
            )}
          </div>
          <div className="col-6">
            <div className="mb-3">內容: {product.content}</div>
            <div className="mb-3">描述: {product.description}</div>
            <div className="mb-3">價錢: {product.price}</div>
            <label htmlFor="qty">數量</label>
            <select
              onChange={(e) => setQtySelect(Number(e.target.value))}
              value={qtySelect}
              className="form-select"
              name="qty"
              id="qty"
            >
              {Array.from({ length: 10 }).map((item, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <div>
              <button
                onClick={() => handleAddCart(product.id, qtySelect)}
                type="button"
                className="btn btn-primary"
                disabled={isLoading}
              >
                加入購物車
                {isLoading && (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isScreenLoading && <Loading />}
    </>
  );
}

export default ProductDetailPage;
