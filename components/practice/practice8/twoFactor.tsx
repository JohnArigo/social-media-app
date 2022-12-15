import { FormEvent, useState } from "react";
export type TwoFactorType = {
  code: number;
};
export const TwoFactor = ({ code }: TwoFactorType) => {
  const regex = /^[0-9]\b$/;
  const [form, setForm] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const arrayOfInputs = Object.keys(form);
  const arrayOfValues = Object.values(form);
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (regex.test(value)) {
      setForm((prevState: any) => {
        return { ...prevState, [name]: value };
      });

      for (let i = 0; i < arrayOfInputs.length; i++) {
        if (arrayOfInputs[i] === name) {
          if (arrayOfInputs[i + 1] !== undefined) {
            const nextInput = document.getElementsByName(
              arrayOfInputs[i + 1]
            )[0] as HTMLInputElement;
            nextInput.focus();
          }
        }
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      arrayOfValues.includes("") ||
      parseInt(arrayOfValues.join("")) !== code
    ) {
      alert("error");
    } else {
      alert("success");
      setForm({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
      });
    }
  };

  return (
    <main className="w-full h-full absolute bg-white bg-opacity-40 flex justify-center items-center">
      <form
        className="rounded-lg w-56 h-56 px-5 flex flex-col items-center bg-white justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex justify-between mb-5">
          <input
            className={`w-10 h-14 border bg-white ${
              form.input1 === ""
                ? "border-2 border-red-500"
                : "border-2 border-green-300"
            }`}
            type="tel"
            name="input1"
            onChange={handleChange}
            value={form.input1}
            required
          />
          <input
            className={`w-10 h-14 border bg-white ${
              form.input2 === ""
                ? "border-2 border-red-500"
                : "border-2 border-green-300"
            }`}
            type="tel"
            name="input2"
            onChange={handleChange}
            value={form.input2}
            required
          />
          <input
            className={`w-10 h-14 border bg-white ${
              form.input3 === ""
                ? "border-2 border-red-500"
                : "border-2 border-green-300"
            }`}
            type="tel"
            name="input3"
            onChange={handleChange}
            value={form.input3}
            required
          />
          <input
            className={`w-10 h-14 border bg-white ${
              form.input4 === ""
                ? "border-2 border-red-500"
                : "border-2 border-green-300"
            }`}
            type="tel"
            name="input4"
            value={form.input4}
            onChange={handleChange}
            required
          />
        </div>

        <button>Submit</button>
      </form>
    </main>
  );
};
export default TwoFactor;
