import prisma from "../lib/prisma";
import { allFriends, Friend } from "../lib/types";

export async function getStaticProps(context: any) {
  console.log(context.params);
}

export default function Stories({ allFriends }: allFriends) {
  console.log(allFriends);
  if (allFriends?.length === 0 || allFriends === undefined) {
    return (
      <section className=" overflow-x-scroll h-24 flex-nowrap sticky w-screen bg-accent text-info-content flex items-center justify-center shadow-md">
        <h1 className="">Go make some friends</h1>
      </section>
    );
  }
  return (
    <section className=" overflow-x-scroll  h-24 flex-nowrap sticky w-screen bg-accent text-info-content flex items-center justify-center shadow-md">
      {allFriends?.map((friend: Friend) => {
        return <div>These are my friends</div>;
      })}
    </section>
  );
}
