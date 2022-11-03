import prisma from "../lib/prisma";
import { allFriends, friends } from "../lib/types";

// export async function getStaticProps() {
//   const data = prisma.friend.findMany;
// }

export default function Stories({ allFriends }: allFriends) {
  console.log(allFriends);
  if (allFriends?.length === 0) {
    return (
      <section className=" overflow-x-scroll  h-24 flex-nowrap sticky w-screen bg-green-200 flex items-center">
        <h1 className="">Go make some friends</h1>
      </section>
    );
  }
  return (
    <section className=" overflow-x-scroll  h-24 flex-nowrap sticky w-screen bg-green-200 flex items-center">
      {allFriends?.map((friend: friends) => {
        return <div>These are my friends</div>;
      })}
    </section>
  );
}
