import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "Rhino MGR" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly bg-gradient-to-b from-[#6a00ff] to-[#004234] text-white">
      <div className="container flex flex-col items-center justify-center gap-20 px-4 py-2 ">
        <div className=" top-10 flex w-[100%] flex-row items-center justify-evenly gap-4">
          {/*Sign-in button*/}
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(182,100%,70%)]">R</span>hino MGR
        </h1>
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-${
            session ? "2" : "1"
          } md:gap-8`}
        >
          {session ? (
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="newproject"
            >
              <h3 className="flex justify-center text-2xl font-bold">
                Create a new Model{" "}
              </h3>
              <div className="flex justify-center text-lg">
                Show the world your creativity
              </div>
            </Link>
          ) : (
            <></>
          )}
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="searchproject"
          >
            <h3 className="flex justify-center text-2xl font-bold">
              Take a look in the void{" "}
            </h3>
            <div className="text-lg">Let's se what other people</div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {/*Probabilmente qui faro un count totale dei disegni caricati */}
          </p>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
