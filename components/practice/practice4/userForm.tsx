import { set } from "nprogress";
import React, {
  ChangeEventHandler,
  FormEvent,
  SyntheticEvent,
  useState,
} from "react";

export type UserFormType = {
  name: string;
  email: string;
};
export const UserForm = () => {
  const [form, setForm] = useState<UserFormType>({
    name: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState: UserFormType) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const validation = (input: UserFormType) => {
    if (
      input.name.length < 8 ||
      !input.email.includes("@") ||
      !input.email.includes(".")
    ) {
      return false;
    } else return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validation(form);
    if (!validation(form)) {
      alert("error");
    } else {
      alert("success");
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-96 h-64 flex flex-col items-center justify-between"
      >
        <label className="self-start">Name:</label>
        <input
          className="w-96 h-12"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label className="self-start">Email:</label>
        <input
          className="w-96 h-12"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button className="text-black rounded-full bg-gray-50 hover:bg-green-400 focus:bg-green-400 w-72 h-14">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
