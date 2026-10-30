import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-navy-900 text-white">
      <Container className="py-16 sm:py-20">
        {eyebrow ? (
          <Badge tone="light" className="mb-5">
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="font-display max-w-3xl text-4xl leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-lavender-200 sm:text-lg">
          {description}
        </p>
      </Container>
    </div>
  );
}
