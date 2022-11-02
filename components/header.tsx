import { useSession } from "next-auth/react";

import HeaderSession from "./headSession";
import HeaderNoSession from "./headNoSession";

// export async function getServerSideProps(req: NextApiRequest) {
//   //const prisma = new PrismaClient();
//   const session = await getSession({ req });
//   const user = prisma.user.findMany({
//     where: {
//       email: session?.user?.email!,
//     },
//   });
//   return {
//     props: {
//       user: session,
//     },
//   };
// }

export default function Header({ setOpened }: any) {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <HeaderSession setOpened={setOpened} />;
  } else {
    return <HeaderNoSession />;
  }
}
