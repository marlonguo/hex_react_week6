import { useState, useEffect, useRef } from "react";

import { Modal } from "bootstrap";

import { createProduct, updateProduct, uploadPic } from "../utility/adminApi";

function ProductModal({ isOpen, setIsOpen, productModalMode, tempProduct }) {
  const productModalRef = useRef(null);
  const [modalData, setModalData] = useState({ ...tempProduct });

  const Mode = {
    create: "新增",
    edit: "編輯",
  };

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

  function handleProductInputChange(e) {
    const { value, name, type, checked } = e.target;
    setModalData((modalData) => {
      return {
        ...modalData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  async function handleUpdateProduct() {
    const apiCall =
      productModalMode === "create" ? createProduct : updateProduct;
    const productData = {
      ...modalData,
      origin_price: Number(modalData.origin_price),
      price: Number(modalData.price),
      is_enabled: modalData.is_enabled ? 1 : 0,
    };
    try {
      await apiCall(productData, modalData.id);
      setIsOpen(false);
    } catch (error) {
      alert("更新產品失敗");
    }
  }

  function handleCloseProductModal() {
    setIsOpen(false);
  }

  function handleImageChange(e, index) {
    const { value } = e.target;
    const imagesUrl = [...modalData.imagesUrl];

    imagesUrl[index] = value;
    setModalData((modalData) => {
      return {
        ...modalData,
        imagesUrl,
      };
    });
  }

  function handleAddImages() {
    const imagesUrl = [...modalData.imagesUrl, ""];

    setModalData((modalData) => {
      return {
        ...modalData,
        imagesUrl,
      };
    });
  }

  function handleRemoveImages(index) {
    const imagesUrl = [...modalData.imagesUrl];
    imagesUrl.splice(index, 1);

    setModalData((modalData) => {
      return {
        ...modalData,
        imagesUrl: imagesUrl.length > 0 ? imagesUrl : [""],
      };
    });
  }

  function handleRemoveProductImages() {
    setModalData((modalData) => {
      return {
        ...modalData,
        imageUrl: "",
      };
    });
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    const picFormData = new FormData();
    picFormData.append("file-to-upload", file);

    try {
      const { imageUrl } = await uploadPic(picFormData);
      if (modalData.imageUrl === "") {
        setModalData({
          ...modalData,
          imageUrl,
        });
      } else {
        if (modalData.imagesUrl.length < 5) {
          const imagesUrl = [...modalData.imagesUrl, imageUrl].filter(
            (item) => item !== ""
          );

          setModalData((modalData) => {
            return {
              ...modalData,
              imagesUrl,
            };
          });
        } else {
          alert("更多商品圖最多只能5張");
        }
      }
      e.target.value = "";
    } catch (error) {}
  }

  return (
    <div
      ref={productModalRef}
      className="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {Mode[productModalMode]}
              產品
            </h5>
            <button
              onClick={handleCloseProductModal}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-6">
                <label htmlFor="title" className="form-label">
                  標題
                </label>
                <input
                  onChange={handleProductInputChange}
                  value={modalData.title}
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                />
                <label htmlFor="category" className="form-label">
                  分類
                </label>
                <input
                  onChange={handleProductInputChange}
                  value={modalData.category}
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                />
                <label htmlFor="unit" className="form-label">
                  單位
                </label>
                <input
                  onChange={handleProductInputChange}
                  value={modalData.unit}
                  type="text"
                  className="form-control"
                  id="unit"
                  name="unit"
                />
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <label htmlFor="origin_price" className="form-label">
                        原價
                      </label>
                      <input
                        onChange={handleProductInputChange}
                        value={modalData.origin_price}
                        type="number"
                        className="form-control"
                        id="origin_price"
                        name="origin_price"
                      />
                    </div>

                    <div className="col-6">
                      <label htmlFor="price" className="form-label">
                        售價
                      </label>
                      <input
                        onChange={handleProductInputChange}
                        value={modalData.price}
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                      />
                    </div>
                  </div>
                </div>
                <label htmlFor="description" className="form-label">
                  商品描述
                </label>
                <textarea
                  onChange={handleProductInputChange}
                  value={modalData.description}
                  row="5"
                  cols="33"
                  className="form-control"
                  id="description"
                  name="description"
                />
                <label htmlFor="content" className="form-label">
                  內容說明
                </label>
                <input
                  onChange={handleProductInputChange}
                  value={modalData.content}
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                />
                <div className="form-check">
                  <input
                    onChange={handleProductInputChange}
                    checked={modalData.is_enabled}
                    type="checkbox"
                    className="form-check-input"
                    id="is_enabled"
                    name="is_enabled"
                  />
                  <label htmlFor="is_enabled" className="form-check-label">
                    是否啟用
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-5">
                  <label htmlFor="fileUpload" className="form-label">
                    圖片上傳
                  </label>
                  <input
                    onChange={handleFileUpload}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="form-control"
                    id="fileUpload"
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="imageUrl" className="form-label">
                    商品圖
                  </label>

                  <input
                    onChange={handleProductInputChange}
                    value={modalData.imageUrl}
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                  />
                  {modalData.imageUrl !== "" && (
                    <>
                      <img
                        src={modalData.imageUrl}
                        alt={modalData.title}
                        className="img-fluid"
                      />

                      <button
                        onClick={handleRemoveProductImages}
                        className="btn btn-outline-danger btn-sm w-100"
                      >
                        取消圖片
                      </button>
                    </>
                  )}
                </div>

                {modalData.imagesUrl.map((image, index) => (
                  <div key={index} className="mb-2">
                    <label
                      htmlFor={`imagesUrl-${index + 1}`}
                      className="form-label"
                    >
                      更多圖片 {index + 1}
                    </label>
                    <input
                      value={image}
                      onChange={(e) => handleImageChange(e, index)}
                      id={`imagesUrl-${index + 1}`}
                      type="text"
                      className="form-control mb-2"
                    />
                    {image && (
                      <>
                        <img
                          src={image}
                          alt={`更多圖片 ${index + 1}`}
                          className="img-fluid mb-2"
                        />

                        <button
                          onClick={(e) => handleRemoveImages(index)}
                          className="btn btn-outline-danger btn-sm w-100"
                        >
                          取消圖片
                        </button>
                      </>
                    )}
                  </div>
                ))}
                <div className="btn-group w-100">
                  {modalData.imagesUrl.length > 0 &&
                    modalData.imagesUrl.length < 5 &&
                    modalData.imagesUrl[modalData.imagesUrl.length - 1] !==
                      "" && (
                      <button
                        className="btn btn-outline-primary btn-sm w-100"
                        type="button"
                        onClick={handleAddImages}
                      >
                        新增圖片
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseProductModal}
              type="button"
              className="btn btn-secondary"
            >
              取消
            </button>
            <button
              onClick={handleUpdateProduct}
              type="button"
              className="btn btn-primary"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
