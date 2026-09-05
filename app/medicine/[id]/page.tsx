import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getMedicineById } from "@/lib/api";

interface MedicinePageProps {
  params: Promise<{
    id: string;
  }>;
}

function getValues(value?: string[]) {
  return value?.length ? value : ["Not available"];
}

export default async function MedicinePage({
  params,
}: MedicinePageProps) {
  const { id } = await params;

  const medicine = await getMedicineById(id);

  if (!medicine) {
    notFound();
  }

  const openfda = medicine.openfda;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to search
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <p className="text-sm font-medium text-primary">
              Medicine details
            </p>

            <CardTitle className="text-2xl sm:text-3xl">
              {openfda?.brand_name?.[0] ?? "Unknown medicine"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <DetailField
                label="Brand name"
                values={openfda?.brand_name}
              />

              <DetailField
                label="Generic name"
                values={openfda?.generic_name}
              />

              <DetailField
                label="Manufacturer"
                values={openfda?.manufacturer_name}
              />

              <DetailField
                label="Product type"
                values={openfda?.product_type}
              />

              <DetailField
                label="Route"
                values={openfda?.route}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function DetailField({
  label,
  values,
}: {
  label: string;
  values?: string[];
}) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-2 space-y-1">
        {getValues(values).map((value, index) => (
          <p
            key={`${value}-${index}`}
            className="text-sm text-slate-900"
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  );
}