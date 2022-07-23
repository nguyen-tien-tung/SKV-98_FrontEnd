import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import IOrder, { PaymentMethod } from "../../types/IOrder";
import { useForm } from "../../helper/useForm";

import "./CompleteOrder.scss";
import moneyConverter from "@/utils/moneyConverter";
import $axios from "@/axios/index";
import { useSnackbar, VariantType } from "notistack";

const CompleteOrder = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, message: string) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };
  const { state, dispatch } = useContext(UserContext);

  const orderInfo: IOrder = {
    name: "",
    phoneNumber: "",
    address: "",
    note: "",
    paymentMethod: PaymentMethod.BANK_TRANSFER,
  };
  const submitOrder = async () => {
    try {
      const res = await $axios.post("order", values);
      if (res.status == 201) {
        dispatch({
          type: "UPDATE_USER",
          payload: { ...state.user, shoppingCart: {} },
        });
        handleClickVariant("success", "Successfully Sent Order Request!");
      }
    } catch (error) {
      console.error(error);
      handleClickVariant("error", "Sent Order Request Failed!!");
    }
  };
  const { onChange, onSubmit, values } = useForm(submitOrder, orderInfo);

  return (
    <form className="section flex flex-row justify-evenly" onSubmit={onSubmit}>
      <div>
        <h2>Thông tin thanh toán</h2>
        <div className="flex flex-col w-fit mx-auto">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            value={values.name}
            onChange={onChange}
            name="name"
          />
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input
            type="text"
            value={values.phoneNumber}
            onChange={onChange}
            name="phoneNumber"
          />
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            value={values.address}
            onChange={onChange}
            name="address"
          />
          <label htmlFor="note">Ghi chú</label>
          <textarea value={values.note} onChange={onChange} name="note" />
        </div>
      </div>
      <div>
        <div
          className="bg-background-red border-2 border-black flex flex-col px-4 py-5"
          style={{ minWidth: "512px" }}
        >
          <div className="subSection">
            <h2>Đơn hàng của bạn</h2>
            <div className="flex flex-row justify-between py-4 border-b-2">
              <span>Sản phẩm</span>
              <span>Tạm tính</span>
            </div>
          </div>
          {state.user?.shoppingCart &&
            Object.keys(state.user.shoppingCart).map((key) => (
              <div
                className="flex flex-row justify-between py-4 pr-5"
                key={key}
              >
                <span>
                  {state.user?.shoppingCart[key].quantity}&nbsp;x&nbsp;
                  {state.user?.shoppingCart[key].details.name}&nbsp;(
                  {moneyConverter(state.user?.shoppingCart[key].details.price)})
                </span>
                <span>
                  {moneyConverter(
                    state.user?.shoppingCart[key].details.price *
                      state.user?.shoppingCart[key].quantity
                  )}
                  đ
                </span>
              </div>
            ))}
          <div className="subSection">
            <div className="py-4 border-y-2 flex flex-row justify-between">
              <span>Tổng</span>
              <span>
                {state.user?.shoppingCart
                  ? moneyConverter(
                      Object.values(state.user?.shoppingCart).reduce(
                        (acc, item) => acc + item.details.price * item.quantity,
                        0
                      )
                    )
                  : 0}
                đ
              </span>
            </div>
          </div>
          <div>
            <input
              type="radio"
              id="bankTransfer"
              name="paymentMethod"
              value="BANK_TRANSFER"
              onChange={onChange}
              checked={values.paymentMethod == "BANK_TRANSFER"}
            />
            <label htmlFor="bankTransfer">
              Chuyển khoản ngân hàng
              <br />
              <div className="max-w-sm pl-5">
                Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi.
                Vui lòng sử dụng Số điện thoại của bạn trong phần Nội dung thanh
                toán. Đơn hàng sẽ được giao ngay sau khi bạn thao tác.
                <br /> Thông tin Tài khoản:
                <br /> Ngân hàng: Vietcombank
                <br />
                Số tài khoản: 0711000262051
                <br /> Chủ tài khoản: Trần Đức Mạnh
              </div>
            </label>
            <br></br>
            <input
              type="radio"
              name="paymentMethod"
              id="cash"
              value="CASH"
              checked={values.paymentMethod == "CASH"}
              onChange={onChange}
            />
            <label htmlFor="cash">Tiền mặt</label>
            <br></br>
          </div>
        </div>
        <div className="w-full flex justify-center my-4">
          <button className="bg-red-400 rounded-md px-12 py-3 text-base">
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </form>
  );
};

export default CompleteOrder;
