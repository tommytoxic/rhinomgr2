import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function newproject() {
  const session = await getServerAuthSession();
  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-evenly bg-gradient-to-b from-[#6a00ff] to-[#004234] text-white"></main>
    );
  } else {
    <main className="flex min-h-screen flex-col items-center justify-evenly bg-gradient-to-b from-[#6a00ff] to-[#004234] text-white">
      you have to Sign-in to create new project
    </main>;
    return redirect("/"); //Qui dovrei fare un vero e proprio redirect con path separate
  }
}
