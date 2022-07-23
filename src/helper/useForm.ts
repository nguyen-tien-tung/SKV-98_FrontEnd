import { useState } from "react";

// useForm functional componen
export const useForm = (callback: any, initialState = {}) => {
  const [values, setValues] = useState<any>(initialState);

  // onChange
  const onChange = (event: any) => {
    if (event.target.type == "checkbox") {
      setValues({
        ...values,
        [event.target.name]: event.target.checked,
      });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };

  // return values
  return {
    onChange,
    onSubmit,
    values,
  };
};
