import { useEffect, useRef } from "react";

import { Modal } from "bootstrap";

import { deleteProduct } from "../utility/adminApi";
function DeleteProductModal({ isOpen, setIsOpen, tempProduct }) {
  const deleteProductModalRef = useRef(null);

  useEffect(() => {
    new Modal(deleteProductModalRef.current, {
      backdrop: false,
    });
  }, []);

  useEffect(() => {
    const modalInstance = Modal.getInstance(deleteProductModalRef.current);
    isOpen ? modalInstance.show() : modalInstance.hide();
  }, [isOpen]);

  async function handleDeleteProduct(tempProduct) {
    await deleteProduct(tempProduct.id);

    setIsOpen(false);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <div ref={deleteProductModalRef} className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">刪除產品</h5>
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              是否要刪除
              <span className="text-danger">{tempProduct?.title}</span>
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseModal}
              type="button"
              className="btn btn-secondary"
            >
              否
            </button>
            <button
              onClick={() => handleDeleteProduct(tempProduct)}
              type="button"
              className="btn btn-primary"
            >
              是
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;
