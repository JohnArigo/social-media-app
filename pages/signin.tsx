import { signIn } from "next-auth/react";
import { useState, FormEventHandler } from "react";
import prisma from "../lib/prisma";

export interface credentialType {
  email: string;
  password: string;
}

// export async function getServerSideProps() {
//   const user = await prisma.user.findMany({
//     where: {
//       email: "familyarigo3@gmail.com",
//     },
//   });
//   return {
//     props: {
//       user: user,
//     },
//   };
// }

export default function SignIn() {
  //console.log(user);
  const [accountInfo, setAccountInfo] = useState<credentialType>({
    email: " ",
    password: " ",
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: accountInfo?.email,
      password: accountInfo?.password,
      redirect: false,
    });

    console.log(res);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="h-full w-full flex flex-col justify-center"
      >
        <label>Email Address</label>
        <input
          className="w-full h-12"
          name="email"
          type="email"
          value={accountInfo?.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          className="w-full h-12"
          name="password"
          type="text"
          value={accountInfo?.password}
          onChange={handleChange}
          required
        />
        <button className="mt-10">Sign up</button>
      </form>
    </main>
  );
}
