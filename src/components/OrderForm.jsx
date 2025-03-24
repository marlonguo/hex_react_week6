import { useForm } from "react-hook-form";

import { submitOrder } from "../utility/userApi";

function OrderForm({ setCartState }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { message, ...user } = data;
    const userInfo = { user, message };

    console.log(data);
    await submitOrder(userInfo);
    reset();
    setCartState({ isChange: true });
  });

  return (
    <div className="container mt-4" style={{ maxWidth: "720px" }}>
      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email", {
              required: { value: true, message: "Email 欄位必填" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email 格式錯誤",
              },
            })}
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            id="email"
          />
          {errors.email && (
            <p className="text-danger my-2">{errors.email.message}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            收件人姓名
          </label>
          <input
            {...register("name", {
              required: "收件人欄位必填",
            })}
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            id="name"
          />
          {errors.name && (
            <p className="text-danger my-2">{errors.name.message}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="phone" className="form-label">
            收件人電話
          </label>
          <input
            {...register("tel", {
              required: "電話欄位必填",
              pattern: {
                value: /^(0[2-8]\d{7}|09\d{8})$/,
                message: "電話格式錯誤",
              },
            })}
            type="tel"
            className={`form-control ${errors.tel && "is-invalid"}`}
            id="tel"
            placeholder="請輸入電話"
          />
          {errors.tel && (
            <p className="text-danger my-2">{errors.tel.message}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            收件人地址
          </label>
          <input
            {...register("address", {
              required: "地址欄位必填",
            })}
            type="text"
            className={`form-control ${errors.address && "is-invalid"}`}
            id="address"
            placeholder="請輸入地址"
          />
          {errors.address && (
            <p className="text-danger my-2">{errors.address.message}</p>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="message" className="form-label">
            留言
          </label>
          <textarea
            {...register("message")}
            className="form-control"
            id="message"
            rows="3"
          ></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            送出訂單
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
