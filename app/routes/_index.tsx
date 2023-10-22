import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl mb-14">👋</h1>
        <Link to={"/parallax"} className="underline mt-4">/parallax</Link>
      </div>
    </main>
  );
}
