import { useState, useEffect, useRef } from "react";

import { Modal } from "bootstrap";

import { addCart } from "../utility/userApi";

function ProductModal({
  isOpen,
  setIsOpen,
  tempProduct,
  handleAddCart,
  setCartState,
}) {
  const productModalRef = useRef(null);
  const [modalData, setModalData] = useState({ ...tempProduct });
  const [qtySelect, setQtySelect] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
  }, []);

  useEffect(() => {
    setModalData({ ...tempProduct });
    const modalInstance = Modal.getInstance(productModalRef.current);
    isOpen ? modalInstance.show() : modalInstance.hide();
  }, [isOpen]);

  function handleCloseProductModal() {
    setIsOpen(false);
  }

  async function handleAddCart(product_id) {
    setIsLoading(true);
    const cartItem = { product_id, qty: qtySelect };
    try {
      await addCart(cartItem);
      setCartState({ isChange: true });
    } catch (error) {
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setQtySelect(1);
    }
  }

  return (
    <div
      ref={productModalRef}
      className="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">產品名稱: {modalData.title}</h5>
            <button
              onClick={handleCloseProductModal}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                <div>
                  {modalData.imageUrl && (
                    <img
                      src={modalData.imageUrl}
                      alt={modalData.title}
                      className="img-fluid"
                    />
                  )}
                </div>
                <div className="mb-3">內容: {modalData.content}</div>
                <div className="mb-3">描述: {modalData.description}</div>
                <div className="mb-3">價錢: {modalData.price}</div>
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
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => handleAddCart(modalData.id, qtySelect)}
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
  );
}

export default ProductModal;
