import { getBillboard } from "@/api/billboard";
import { Billboard } from "@/components/billboard";
import { Container } from "@/components/ui/container";

export default async function HomePage() {
  const billboard = await getBillboard("1cc34421-9b58-4cc6-8ab0-372a65c9db94");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  );
}
