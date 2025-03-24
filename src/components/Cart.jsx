import { useState, useEffect } from "react";

import {
  getCart,
  deleteCarts,
  removeCart,
  updateCart,
} from "../utility/userApi";

function Cart() {
  const [cart, setCart] = useState({});
  const [cartState, setCartState] = useState({ isChange: false });
  const [loadingListState, setLoadingListState] = useState([]);

  useEffect(() => {
    (async function () {
      const { carts, total, final_total } = await getCart();

      setCart({ carts, total, final_total });
    })();
  }, [cartState]);

  async function handleClearCart() {
    setLoadingListState((prev) => [...prev, "clearingCart"]);
    try {
      await deleteCarts();
      setCartState({ isChange: true });
    } catch (error) {
    } finally {
      setLoadingListState((prev) =>
        prev.filter((item) => item !== "clearingCart")
      );
    }
  }

  async function handleRemoveCart(id) {
    setLoadingListState((prev) => [...prev, id]);
    try {
      await removeCart(id);
      setCartState({ isChange: true });
    } catch (error) {
    } finally {
      setLoadingListState((prev) => prev.filter((item) => item !== id));
    }
  }

  async function handleUpdateCart(id, product_id, qty) {
    setLoadingListState((prev) => [...prev, product_id]);
    try {
      await updateCart(id, product_id, qty);
      setCartState({ isChange: true });
    } catch (error) {
    } finally {
      setLoadingListState((prev) => prev.filter((item) => item !== product_id));
    }
  }

  return (
    <>
      {cart.carts?.length > 0 && (
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <div className="d-flex">
                <h2 className="me-auto">購物車</h2>
                <button
                  onClick={handleClearCart}
                  type="button"
                  className="btn btn-primary mb-3"
                  disabled={loadingListState.includes("clearingCart")}
                >
                  清空購物車
                  {loadingListState.includes("clearingCart") && (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </button>
              </div>
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">商品名稱</th>
                    <th scope="col">數量/單位</th>

                    <th scope="col">單價</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.carts &&
                    cart.carts.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="btn-group">
                            <button
                              onClick={() => handleRemoveCart(item.id)}
                              disabled={
                                loadingListState.includes(item.product_id) ||
                                loadingListState.includes(item.id)
                              }
                              type="button"
                              className="btn btn-outline-danger"
                              aria-label="Close"
                            >
                              X
                              {loadingListState.includes(item.id) && (
                                <div className="spinner-border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              )}
                            </button>
                          </div>
                        </td>
                        <td>{item.product.title}</td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic outlined example"
                          >
                            <button
                              onClick={() =>
                                handleUpdateCart(
                                  item.id,
                                  item.product_id,
                                  item.qty - 1
                                )
                              }
                              disabled={
                                item.qty === 1 ||
                                loadingListState.includes(item.product_id) ||
                                loadingListState.includes(item.id)
                              }
                              type="button"
                              className="btn btn-outline-dark"
                            >
                              -
                            </button>
                            <span
                              className="btn border border-dark px-4"
                              style={{ cursor: "auto" }}
                            >
                              {item.qty}
                            </span>
                            {loadingListState.includes(item.product_id) && (
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            )}
                            <button
                              onClick={() =>
                                handleUpdateCart(
                                  item.id,
                                  item.product_id,
                                  item.qty + 1
                                )
                              }
                              disabled={
                                loadingListState.includes(item.product_id) ||
                                loadingListState.includes(item.id)
                              }
                              type="button"
                              className="btn btn-outline-dark"
                            >
                              +
                            </button>
                            <span className="btn px-4">
                              {item.product.unit}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>{item.final_total}</div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
