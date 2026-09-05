import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Medicine } from "@/types/medicine";

interface MedicineCardProps {
  medicine: Medicine;
  onClick: () => void;
}

function getFirstValue(value?: string[]) {
  return value?.[0] ?? "Not available";
}

export default function MedicineCard({
  medicine,
  onClick,
}: MedicineCardProps) {
  const openfda = medicine.openfda;

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Brand name
            </p>

            <h3 className="mt-1 truncate text-lg font-semibold text-slate-900">
              {getFirstValue(openfda?.brand_name)}
            </h3>
          </div>

          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Generic name
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {getFirstValue(openfda?.generic_name)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Manufacturer
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {getFirstValue(openfda?.manufacturer_name)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Product type
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {getFirstValue(openfda?.product_type)}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Route
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {getFirstValue(openfda?.route)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}