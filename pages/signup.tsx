import { Modal, PasswordInput, TextInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons";
import { redirect } from "next/dist/server/api-utils";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { portType, signUpType } from "../lib/types";

async function postNewUser(sendingPackage: signUpType) {
  const response = await fetch("../api/userCalls/createUser", {
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
    password: "",
    about: "Initial",
    flex: "Initial",
    theme: "dark",
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await postNewUser(accountInfo);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push(`./signin`);
  };

  return (
    <main className="bg-base-200 text-info w-screen h-screen flex justify-center items-center">
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={open}
        onClose={handleClose}
      >
        SUCCESS! account created. Please sign in
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="h-full w-full sm:w-2/6 lg:w-3/12 flex flex-col justify-center"
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
        <button className="mt-10 btn btn-primary">Sign up</button>
      </form>
    </main>
  );
}
