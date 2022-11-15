import { signIn, useSession } from "next-auth/react";
import { useState, FormEventHandler, useEffect } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons";
import Link from "next/link";
import { themeChange } from "theme-change";
import tailwindConfig from "../tailwind.config";
import { User } from "../lib/types";
import { useRouter } from "next/router";

export interface credentialType {
  email: string;
  password: string;
}

export default function SignIn() {
  const { data: session } = useSession();
  const userID = parseInt(session?.user?.name?.toString()!);
  //console.log(user);
  const [accountInfo, setAccountInfo] = useState<credentialType>({
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setAccountInfo((prevState: credentialType) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: accountInfo?.email,
      password: accountInfo?.password,
      redirect: false,
    });

    if (res?.status === 200) {
      router.push(`./home`);
    }
  };

  const [user, setUser] = useState<User>();

  if (!session) {
    return (
      <main className="text-info w-screen h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="h-full w-full flex flex-col justify-center"
        >
          <label>Email Address</label>
          <TextInput
            className="w-full h-12"
            name="email"
            type="email"
            //error="Invalid email"
            value={accountInfo?.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <PasswordInput
            className="w-full h-12"
            name="password"
            value={accountInfo?.password}
            onChange={handleChange}
            //defaultValue="secret"
            visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
            }
            required
            withAsterisk
          />
          <button className="mt-10">Sign in</button>
        </form>
      </main>
    );
  } else
    return (
      <main className=" text-info flex flex-col justify-center items-center w-screen h-screen">
        <div className="text-center">
          You are currently logged in using email:
        </div>
        <b>{session.user?.email}</b>
        <div>
          If this is an error please{" "}
          <Link href="api/auth/signout">
            <b>SIGN-OUT</b>
          </Link>
          and try again
        </div>
      </main>
    );
}
