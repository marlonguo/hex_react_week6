import axios from "axios";

const { VITE_BASE_URL: BASE_URL, VITE_API_PATH: API_PATH } = import.meta.env;

export async function getProducts(page) {
  try {
    const res = await axios.get(
      `${BASE_URL}/v2/api/${API_PATH}/products?page=${page}`
    );

    return res.data;
  } catch (error) {
    alert("取得產品資料失敗");
  }
}

export async function getProduct(id) {
  try {
    const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);

    return res.data;
  } catch (error) {
    alert("取得產品資料失敗");
  }
}

export async function getCart() {
  try {
    const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);

    return res.data.data;
  } catch (error) {
    alert("取得購物車資料失敗");
  }
}

export async function addCart(item) {
  try {
    const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
      data: item,
    });
  } catch (error) {
    alert("購物車添加商品失敗");
  }
}

export async function deleteCarts() {
  try {
    await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
  } catch (error) {
    alert(清空購物車失敗);
  }
}

export async function removeCart(id) {
  try {
    await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
  } catch (error) {
    alert(商品移出購物車失敗);
  }
}

export async function updateCart(id, product_id, qty) {
  try {
    console.log("api: ", `${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
    console.log("id: ", product_id);
    console.log("qty: ", qty);

    await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`, {
      data: {
        product_id,
        qty,
      },
    });
  } catch (error) {
    alert(更新購物車失敗);
  }
}

export async function submitOrder(userInfo) {
  try {
    await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, {
      data: userInfo,
    });
  } catch (error) {
    alert("送出訂單失敗");
  }
}

export async function checkUserLogin() {
  try {
    const res = await axios.post(`${BASE_URL}/v2/api/user/check`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
