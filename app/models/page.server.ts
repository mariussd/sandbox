import { prisma } from "~/db.server";

import type { Page } from "@prisma/client";

export function getPages() {
  return prisma.page.findMany({
    select: { id: true },
  });
}

export function getPage({ pageId }: { pageId: Page["id"] }) {
  return prisma.page.findFirst({
    select: { id: true, body: true, title: true },
    where: { id: pageId },
  });
}

export function updatePage({
  pageId,
  page,
}: {
  pageId: Page["id"];
  page: { title: string; body: string };
}) {
  console.log("update", page);
  return prisma.page.update({
    data: {
      title: page.title,
      body: page.body,
    },
    where: { id: pageId },
  });
}
