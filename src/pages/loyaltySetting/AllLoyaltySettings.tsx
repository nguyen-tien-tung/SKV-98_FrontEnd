import React from "react";
import Checkbox from "@mui/material/Checkbox";

import { useForm } from "../../helper/useForm";
import $axios from "@/axios/index";
import ILoyaltySetting from "../../types/ILoyaltySetting";
import { useState, useEffect } from "react";

const AllLoyaltySettings = () => {
  const [allLoyaltySettings, setAllLoyaltySettings] = useState<
    ILoyaltySetting[]
  >([]);

  const loyaltySetting = {
    title: "",
    hasPrivateCard: false,
    hasBirthdayGift: false,
    hasEventTicket: false,
    isVip: false,
    pointRequirement: 0,
    pointGainPerItem: 0,
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.get("loyalty-setting");
        setAllLoyaltySettings(res.data);
      } catch (error) {}
    })();
  }, []);

  const submitForm = async () => {
    const res = $axios.post("/loyalty-setting", values);
  };
  const { onChange, onSubmit, values } = useForm(submitForm, loyaltySetting);

  return (
    <div className="w-full  mx-auto">
      {allLoyaltySettings.length > 0 && (
        <div>
          ALL EXISTING LOYALTY LEVEL SETTINGS
          <table className="table-auto text-center w-full">
            <thead className="border-b-2">
              <tr>
                <th>title</th>
                <th>hasPrivateCard</th>
                <th>hasBirthdayGift</th>
                <th>hasEventTicket</th>
                <th>isVip</th>
                <th>pointGainPerItem</th>
                <th>pointRequirement</th>
              </tr>
            </thead>
            <tbody className="gap-3">
              {allLoyaltySettings
                .sort((a: ILoyaltySetting, b: ILoyaltySetting) => a.id - b.id)
                .map((level) => (
                  <tr key={level.id} className="border-b-2">
                    <td className="">{level.title}</td>
                    <td className="">
                      <Checkbox checked={level.hasPrivateCard} disabled />
                    </td>
                    <td className="">
                      <Checkbox checked={level.hasBirthdayGift} disabled />
                    </td>
                    <td className="">
                      <Checkbox checked={level.hasEventTicket} disabled />
                    </td>
                    <td className="">
                      <Checkbox checked={level.isVip} disabled />
                    </td>
                    <td className="">{level.pointGainPerItem}</td>
                    <td className="">{level.pointRequirement}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col"
      >
        <h1>Create Loyalty Setting</h1>
        <div className="flex items-center gap-4">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="hasPrivateCard">Having Private Card ?</label>
          <input type="checkbox" name="hasPrivateCard" onClick={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="hasBirthdayGift">Having Birthday Gift?</label>
          <input type="checkbox" name="hasBirthdayGift" onClick={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="hasEventTicket">Having Event Ticket ?</label>
          <input type="checkbox" name="hasEventTicket" onClick={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="isVip">Is Vip ?</label>
          <input type="checkbox" name="isVip" onClick={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="isVip">pointGainPerItem ?</label>
          <input type="number" name="pointGainPerItem" onChange={onChange} />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="isVip">pointRequirement ?</label>
          <input type="number" name="pointRequirement" onChange={onChange} />
        </div>
        <button type="submit" className="bg-cyan-300 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AllLoyaltySettings;
