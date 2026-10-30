"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()}>
      Save as PDF
    </Button>
  );
}
