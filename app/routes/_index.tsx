import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "mariussd" }];

export const links: LinksFunction = () => [{rel: "icon", href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👹</text></svg>'}]

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl mb-14">👋</h1>
        <Link to={"/parallax"} className="underline mt-4">/parallax</Link>
        <Link to={"/three"} className="underline mt-2">/three</Link>
      </div>
    </main>
  );
}
