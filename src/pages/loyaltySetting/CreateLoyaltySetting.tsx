import React from "react";
import { useForm } from "../../helper/useForm";
import $axios from "@/axios/index";

const CreateLoyaltySetting = () => {
  const loyaltySetting = {
    title: "",
    hasPrivateCard: false,
    hasBirthdayGift: false,
    hasEventTicket: false,
    isVip: false,
  };

  const submitForm = async () => {
    const res = $axios.post("/loyalty-setting", values);
  };
  const { onChange, onSubmit, values } = useForm(submitForm, loyaltySetting);

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <h1>Create Loyalty Setting</h1>
        <label htmlFor="title">TITLE</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={onChange}
        />

        <label htmlFor="hasPrivateCard">Having Private Card ?</label>
        <input
          type="checkbox"
          name="hasPrivateCard"
          value={values.hasPrivateCard}
          onChange={onChange}
        />
        <label htmlFor="hasBirthdayGift">Having Birthday Gift?</label>
        <input
          type="checkbox"
          name="hasBirthdayGift"
          value={values.hasBirthdayGift}
          onChange={onChange}
        />
        <label htmlFor="hasEventTicket">Having Event Ticket ?</label>
        <input
          type="checkbox"
          name="hasEventTicket"
          value={values.hasEventTicket}
          onChange={onChange}
        />
        <label htmlFor="isVip">Is Vip ?</label>
        <input
          type="checkbox"
          name="isVip"
          value={values.isVip}
          onChange={onChange}
        />
        <button type="submit" className="bg-cyan-300 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLoyaltySetting;
