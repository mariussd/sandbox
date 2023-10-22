import { Form, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPage, updatePage } from "~/models/page.server";
import { useState } from "react";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.pageId, "pageId not found");

  const pageId = params.pageId;
  const page = await getPage({ pageId });

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ page });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.pageId, "pageId not found");

  const formData = await request.formData();

  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 },
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 },
    );
  }

  const updatedPage = await updatePage({
    pageId: params.pageId,
    page: { title, body },
  });

  return null;
};

export default function Page() {
  const data = useLoaderData<typeof loader>();

  const [edit, setEdit] = useState(false);

  const handleEditClick = () => {
    if (edit) {
      /* updatePage({
        pageId: data.page.id,
        page: {
          title: "Næmmen!",
          body: "Se der ja, der har vi oppdatert!",
        },
      });*/
    }
    setEdit((edit) => !edit);
  };

  return (
    <div className="items-center justify-center text-center pt-16">
      <h1 className="text-2xl">{data.page.title}</h1>
      <p>{data.page.body}</p>
      <Form method="post">
        <label>Title</label>
        <input type="text" name="title" />
        <label>Body</label>
        <textarea name="body" />
        <button
          type="submit"
          onClick={() => setEdit((edit) => !edit)}
          className="bg-slate-200 px-6 py-2 rounded-md border border-slate-300 active:scale-95"
        >
          {edit ? "Stop editing" : "Edit"}
        </button>
      </Form>
      <footer className="mt-10 text-gray-500">
        You are on page {data.page.id}
      </footer>
    </div>
  );
}
