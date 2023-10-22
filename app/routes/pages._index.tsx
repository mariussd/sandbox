import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getPages } from "~/models/page.server";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pages = await getPages();

  return json({ pages });
};

export default function PagesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Pages</h1>
      <ul>
        {data.pages.map((page) => (
          <li key={page.id}>
            <Link to={page.id}>{page.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
