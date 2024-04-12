import { db } from "@/lib/db";
import { BillboardForm } from "@/components/forms/billboard-form";
import { Separator } from "@/components/ui/separator";

import { BillboardHeading } from "./components/billboard-heading";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardHeading billboard={billboard} />

        <Separator />

        <BillboardForm billboard={billboard} />
      </div>
    </div>
  );
}
