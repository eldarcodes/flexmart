import { UserButton } from "@clerk/nextjs";

export default function SetupPage() {
  return (
    <div className="h-screen p-20">
      <UserButton showName />
    </div>
  );
}
