import prisma from "../lib/prisma";

// export async function getStaticProps() {
//   const data = prisma.friend.findMany;
// }

export default function Stories() {
  return (
    <section className=" overflow-x-scroll  h-24 flex-nowrap sticky w-screen bg-green-200 flex items-center"></section>
  );
}
