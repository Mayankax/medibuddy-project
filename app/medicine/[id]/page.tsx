import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Baby,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Info,
  Pill,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getMedicineById } from "@/lib/api";

interface MedicineDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function getFirstValue(value?: string[]) {
  return value?.[0] ?? "Not available";
}

function getValues(value?: string[]) {
  if (!value || value.length === 0) {
    return [];
  }

  return value.filter(Boolean);
}

function DetailField({
  label,
  values,
}: {
  label: string;
  values?: string[];
}) {
  const items = getValues(values);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <div className="mt-2 space-y-2">
        {items.map((value, index) => (
          <p
            key={`${label}-${index}`}
            className="whitespace-pre-line break-words text-sm leading-6 text-slate-700"
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  );
}

function InformationSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Info;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
}

function TextSection({
  title,
  icon: Icon,
  values,
  tone = "default",
}: {
  title: string;
  icon: typeof Info;
  values?: string[];
  tone?: "default" | "warning" | "danger";
}) {
  const items = getValues(values);

  if (items.length === 0) {
    return null;
  }

  const toneClasses = {
    default: "border-slate-200 bg-white",
    warning: "border-amber-200 bg-amber-50/50",
    danger: "border-red-200 bg-red-50/50",
  };

  const iconClasses = {
    default: "bg-blue-50 text-primary",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <Card className={`overflow-hidden shadow-sm ${toneClasses[tone]}`}>
      <CardHeader className="border-b border-inherit px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconClasses[tone]}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-5">
        <div className="space-y-4">
          {items.map((value, index) => (
            <p
              key={`${title}-${index}`}
              className="whitespace-pre-line break-words text-sm leading-7 text-slate-700"
            >
              {value}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function MedicineDetailPage({
  params,
}: MedicineDetailPageProps) {
  const { id } = await params;

  const medicine = await getMedicineById(id);

  if (!medicine) {
    notFound();
  }

  const openfda = medicine.openfda ?? {};

  const brandName = getFirstValue(openfda.brand_name);
  const genericName = getFirstValue(openfda.generic_name);
  const manufacturer = getFirstValue(openfda.manufacturer_name);
  const productType = getFirstValue(openfda.product_type);
  const route = getFirstValue(openfda.route);

  const activeIngredients = getValues(medicine.active_ingredient);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to search
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1.5 bg-gradient-to-r from-primary via-blue-400 to-cyan-400" />

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary">
                  <Pill className="h-7 w-7" />
                </div>

                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-50">
                      FDA medicine label
                    </Badge>

                    {productType !== "Not available" && (
                      <Badge variant="secondary" className="rounded-full">
                        {productType}
                      </Badge>
                    )}
                  </div>

                  <h1 className="break-words text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
                    {brandName}
                  </h1>

                  {genericName !== "Not available" && (
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                      {genericName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                {route !== "Not available" && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1.5"
                  >
                    Route: {route}
                  </Badge>
                )}

                {manufacturer !== "Not available" && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1.5"
                  >
                    <Building2 className="mr-1.5 h-3 w-3" />
                    {manufacturer}
                  </Badge>
                )}
              </div>
            </div>

            {/* Quick facts */}
            <div className="mt-8 grid gap-3 border-t border-slate-100 pt-7 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Brand name
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-800">
                  {brandName}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Product type
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-800">
                  {productType}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Manufacturer
                </p>

                <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
                  {manufacturer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        {getValues(medicine.description).length > 0 && (
          <div className="mt-8">
            <InformationSection
              icon={FileText}
              title="Description"
              description="Description provided in the FDA drug label."
            >
              <TextSection
                title="Medicine description"
                icon={FileText}
                values={medicine.description}
              />
            </InformationSection>
          </div>
        )}

        {/* Purpose */}
        {getValues(medicine.purpose).length > 0 && (
          <div className="mt-8">
            <Card className="border-blue-100 bg-blue-50/50 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-primary">
                    <Info className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-700">
                      Purpose
                    </p>

                    <div className="mt-2 space-y-2">
                      {getValues(medicine.purpose).map((value, index) => (
                        <p
                          key={index}
                          className="whitespace-pre-line text-sm font-semibold leading-6 text-slate-800"
                        >
                          {value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* At a glance */}
        <div className="mt-10">
          <InformationSection
            icon={ClipboardList}
            title="At a glance"
            description="Key information available from the FDA label."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <DetailField
                label="Active ingredients"
                values={medicine.active_ingredient}
              />

              <DetailField
                label="Dosage form & strengths"
                values={medicine.dosage_forms_and_strengths}
              />

              <DetailField label="Route" values={openfda.route} />

              <DetailField label="Product type" values={openfda.product_type} />

              <DetailField label="Generic name" values={openfda.generic_name} />

              <DetailField
                label="Manufacturer"
                values={openfda.manufacturer_name}
              />
            </div>
          </InformationSection>
        </div>

        {/* Active ingredients */}
        {activeIngredients.length > 0 && (
          <div className="mt-10">
            <InformationSection
              icon={Pill}
              title="Active ingredients"
              description="Active medicinal ingredients reported in the label."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {activeIngredients.map((ingredient, index) => (
                  <Card key={index} className="border-slate-200 shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                          <Pill className="h-4 w-4" />
                        </div>

                        <p className="whitespace-pre-line text-sm font-medium leading-6 text-slate-700">
                          {ingredient}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </InformationSection>
          </div>
        )}

        {/* Uses */}
        {getValues(medicine.indications_and_usage).length > 0 && (
          <div className="mt-10">
            <InformationSection
              icon={CheckCircle2}
              title="Uses & indications"
            >
              <TextSection
                title="Indications and usage"
                icon={CheckCircle2}
                values={medicine.indications_and_usage}
              />
            </InformationSection>
          </div>
        )}

        {/* Dosage */}
        {getValues(medicine.dosage_and_administration).length > 0 && (
          <div className="mt-10">
            <InformationSection
              icon={ClipboardList}
              title="Dosage & directions"
            >
              <TextSection
                title="Directions"
                icon={ClipboardList}
                values={medicine.dosage_and_administration}
              />
            </InformationSection>
          </div>
        )}

        {/* Safety */}
        {(getValues(medicine.warnings).length > 0 ||
          getValues(medicine.adverse_reactions).length > 0 ||
          getValues(medicine.contraindications).length > 0) && (
          <div className="mt-10">
            <InformationSection
              icon={ShieldAlert}
              title="Important safety information"
              description="Safety information reproduced from the available FDA label."
            >
              <div className="space-y-4">
                <TextSection
                  title="Warnings"
                  icon={AlertTriangle}
                  values={medicine.warnings}
                  tone="danger"
                />

                <TextSection
                  title="Contraindications"
                  icon={ShieldAlert}
                  values={medicine.contraindications}
                  tone="danger"
                />

                <TextSection
                  title="Adverse reactions"
                  icon={AlertTriangle}
                  values={medicine.adverse_reactions}
                  tone="warning"
                />
              </div>
            </InformationSection>
          </div>
        )}

        {/* Precautions */}
        {(getValues(medicine.do_not_use).length > 0 ||
          getValues(medicine.ask_doctor).length > 0 ||
          getValues(medicine.pregnancy_or_breast_feeding).length > 0 ||
          getValues(medicine.stop_use).length > 0 ||
          getValues(medicine.when_using).length > 0) && (
          <div className="mt-10">
            <InformationSection
              icon={Stethoscope}
              title="Safety precautions"
              description="Important precautions included in the drug label."
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <TextSection
                  title="Do not use"
                  icon={ShieldAlert}
                  values={medicine.do_not_use}
                  tone="danger"
                />

                <TextSection
                  title="Ask a doctor"
                  icon={Stethoscope}
                  values={medicine.ask_doctor}
                  tone="warning"
                />

                <TextSection
                  title="Pregnancy & breastfeeding"
                  icon={Baby}
                  values={medicine.pregnancy_or_breast_feeding}
                  tone="warning"
                />

                <TextSection
                  title="When to stop use"
                  icon={AlertTriangle}
                  values={medicine.stop_use}
                  tone="danger"
                />

                <TextSection
                  title="When using"
                  icon={Info}
                  values={medicine.when_using}
                />
              </div>
            </InformationSection>
          </div>
        )}

        {/* Drug interactions */}
        {getValues(medicine.drug_interactions).length > 0 && (
          <div className="mt-10">
            <InformationSection
              icon={AlertTriangle}
              title="Drug interactions"
              description="Drug interaction information available in the FDA label."
            >
              <TextSection
                title="Interactions"
                icon={AlertTriangle}
                values={medicine.drug_interactions}
                tone="warning"
              />
            </InformationSection>
          </div>
        )}

        {/* Source note */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Source: US FDA drug label
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              This information is reproduced from the available openFDA drug
              label data. Label information may vary between products and
              countries. It is not a substitute for medical advice from a
              qualified healthcare professional.
            </p>

            {medicine.id && (
              <p className="mt-2 break-all font-mono text-[11px] text-slate-400">
                Record ID: {medicine.id}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}