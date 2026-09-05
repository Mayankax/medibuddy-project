import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4 py-10">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-500" />
            </div>

            <CardTitle className="text-2xl">Medicine not found</CardTitle>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-sm text-slate-500">
              We couldn't find the medicine you're looking for. It may have been
              removed or the URL may be invalid.
            </p>

            <Link href="/" className="mt-6 inline-block">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to search
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
