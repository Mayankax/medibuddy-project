"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Medicine detail error");
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4 py-10">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>

            <CardTitle className="text-2xl">Unable to load medicine</CardTitle>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-sm text-slate-500">
              Something went wrong while loading this medicine. Please try
              again.
            </p>

            <Button onClick={() => reset()} className="mt-6">
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
