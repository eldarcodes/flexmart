"use client";

import { useParams } from "next/navigation";

import { ApiAlert } from "@/components/api-alert";
import { useOrigin } from "@/hooks/use-origin";

export function EnvVars() {
  const origin = useOrigin();
  const params = useParams();

  return (
    <div className="space-y-2">
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="admin"
      />
    </div>
  );
}
