import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export async function getProducts(page) {
  try {
    const res = await axios.get(
      `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
    );

    return res.data;
  } catch (error) {
    alert("取得產品資料失敗");
  }
}

export async function createProduct(productData) {
  try {
    await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/product`, {
      data: productData,
    });
  } catch (error) {
    alert("新增產品失敗");
  }
}

export async function updateProduct(productData, id) {
  try {
    await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`, {
      data: productData,
    });
  } catch (error) {
    alert("更新產品失敗");
  }
}

export async function deleteProduct(id) {
  try {
    await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`);
  } catch (error) {
    alert("刪除產品失敗");
  }
}

export async function uploadPic(picFormData) {
  try {
    const res = await axios.post(
      `${BASE_URL}/v2/api/${API_PATH}/admin/upload`,
      picFormData
    );

    return res.data;
  } catch (error) {
    alert("圖片上傳失敗");
  }
}
