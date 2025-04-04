import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { checkUserLogin } from "../utility/userApi";

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoginPage() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    if (token)
      (async function () {
        const res = await checkUserLogin();
        if (res.success) {
          navigate("/admin/products");
        }
      })();
  }, []);
  function handleAccountInputChange(e) {
    const { name, value } = e.target;
    setAccount((account) => {
      return { ...account, [name]: value };
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      navigate("/admin/products");
    } catch (error) {
      alert("登入失敗");
    }
  }
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h3>請先登入</h3>
      <form onSubmit={handleLogin} className="d-flex flex-column">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="帳號"
            name="username"
            value={account.username}
            onChange={handleAccountInputChange}
          />
          <label htmlFor="email">帳號</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            name="password"
            value={account.password}
            onChange={handleAccountInputChange}
          />
          <label htmlFor="password">密碼</label>
        </div>
        <button className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
}

export default LoginPage;
