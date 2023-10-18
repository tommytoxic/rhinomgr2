import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export async function NavBar() {
  const session = await getServerAuthSession();
  return (
    <nav className="fixed left-0 top-0 z-20 h-14 w-full border-b border-gray-200 bg-white shadow-lg shadow-emerald-500 dark:border-gray-600 dark:bg-[#6a00ff]">
      <div className="mx-auto    max-w-screen-xl justify-between   p-2">
        <div className="">
          <div className="flex w-[100%] flex-row items-center justify-between gap-4">
            {/*Sign-in button*/}
            <p className="sm:text-l text-center text-white md:text-xl">
              {session && <span>Welcome {session.user?.name}</span>}
            </p>
            <Link href="/" className="sm:text-l text-white md:text-xl">
              Home
            </Link>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/20 px-10 py-3 text-xs font-semibold text-white no-underline transition hover:bg-white/30"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
