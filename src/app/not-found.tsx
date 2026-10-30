import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-600">
        404
      </p>
      <h1 className="font-display mt-3 text-4xl text-navy-900">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        That address is not part of the public studio site.
      </p>
      <div className="mt-8">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
}
