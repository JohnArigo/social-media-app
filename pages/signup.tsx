import { PasswordInput, TextInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons";
import { useState } from "react";

export interface signUpType {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

async function postNewUser(sendingPackage: signUpType) {
  const response = await fetch("../api/createUser", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function SignUp() {
  const [accountInfo, setAccountInfo] = useState<signUpType>({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setAccountInfo((prevState: signUpType) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await postNewUser(accountInfo);
      //success then MODAL
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex flex-col justify-center"
      >
        <label>First Name</label>
        <TextInput
          className="w-full h-12"
          name="fName"
          type="text"
          value={accountInfo.fName}
          onChange={handleChange}
          required
        />
        <label>Last Name</label>
        <TextInput
          className="w-full h-12"
          name="lName"
          type="text"
          value={accountInfo.lName}
          onChange={handleChange}
          required
        />
        <label>Email Address</label>
        <TextInput
          className="w-full h-12"
          name="email"
          type="email"
          value={accountInfo.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <PasswordInput
          className="w-full h-12"
          name="password"
          value={accountInfo.password}
          onChange={handleChange}
          defaultValue="secret"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
          required
          withAsterisk
        />
        <button className="mt-10">Sign up</button>
      </form>
    </main>
  );
}
