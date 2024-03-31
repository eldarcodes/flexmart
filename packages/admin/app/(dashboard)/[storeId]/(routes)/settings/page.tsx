import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { StoreSettingsForm } from "@/components/forms/store-settings-form";
import { db } from "@/lib/db";

import { StoreSettingsHeading } from "./components/store-settings-heading";
import { EnvVars } from "./components/env-vars";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) {
    return redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StoreSettingsHeading store={store} />

        <Separator />

        <StoreSettingsForm store={store} />

        <Separator />

        <EnvVars />
      </div>
    </div>
  );
}
