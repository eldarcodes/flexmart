import { db } from "@/lib/db";
import { ColorForm } from "@/components/forms/color-form";
import { Separator } from "@/components/ui/separator";

import { ColorHeading } from "./components/color-heading";

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorHeading color={color} />

        <Separator />

        <ColorForm color={color} />
      </div>
    </div>
  );
}
