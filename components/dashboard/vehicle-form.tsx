"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { createVehicleAction, updateVehicleAction } from "@/lib/actions/vehicles";
import type {
  FuelType,
  Transmission,
  Vehicle,
  VehicleInput,
  VehiclePhoto,
} from "@/types/vehicle";
import { PhotoUploader } from "@/components/dashboard/photo-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TRANSMISSIONS: { value: Transmission; label: string }[] = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "cvt", label: "CVT" },
  { value: "dual-clutch", label: "Dual-clutch" },
];

const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: "gasoline", label: "Gasoline" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Hybrid" },
  { value: "electric", label: "Electric" },
  { value: "plug-in-hybrid", label: "Plug-in hybrid" },
];

interface FormState {
  make: string;
  model: string;
  year: string;
  description: string;
  mileage: string;
  transmission: Transmission | "";
  fuelType: FuelType | "";
  exteriorColor: string;
  interiorColor: string;
  bodyType: string;
  vin: string;
  priceDisplay: string;
  priceCompareAt: string;
  status: "draft" | "published";
  photos: VehiclePhoto[];
}

function toFormState(vehicle?: Vehicle): FormState {
  if (!vehicle) {
    return {
      make: "",
      model: "",
      year: String(new Date().getFullYear()),
      description: "",
      mileage: "",
      transmission: "",
      fuelType: "",
      exteriorColor: "",
      interiorColor: "",
      bodyType: "",
      vin: "",
      priceDisplay: "",
      priceCompareAt: "",
      status: "draft",
      photos: [],
    };
  }
  return {
    make: vehicle.make,
    model: vehicle.model,
    year: String(vehicle.year),
    description: vehicle.description,
    mileage: vehicle.specs.mileage != null ? String(vehicle.specs.mileage) : "",
    transmission: vehicle.specs.transmission ?? "",
    fuelType: vehicle.specs.fuelType ?? "",
    exteriorColor: vehicle.specs.exteriorColor,
    interiorColor: vehicle.specs.interiorColor,
    bodyType: vehicle.specs.bodyType,
    vin: vehicle.specs.vin,
    priceDisplay: vehicle.priceDisplay != null ? String(vehicle.priceDisplay) : "",
    priceCompareAt: vehicle.priceCompareAt != null ? String(vehicle.priceCompareAt) : "",
    status: vehicle.status,
    photos: vehicle.photos,
  };
}

function buildInput(form: FormState): VehicleInput {
  return {
    make: form.make.trim(),
    model: form.model.trim(),
    year: Number(form.year),
    description: form.description.trim(),
    specs: {
      mileage: form.mileage.trim() ? Number(form.mileage) : null,
      transmission: form.transmission || null,
      fuelType: form.fuelType || null,
      exteriorColor: form.exteriorColor.trim(),
      interiorColor: form.interiorColor.trim(),
      bodyType: form.bodyType.trim(),
      vin: form.vin.trim(),
    },
    photos: form.photos,
    priceDisplay: form.priceDisplay.trim() ? Number(form.priceDisplay) : null,
    priceCompareAt: form.priceCompareAt.trim() ? Number(form.priceCompareAt) : null,
    status: form.status,
  };
}

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.make.trim()) errors.make = "Make is required.";
  if (!form.model.trim()) errors.model = "Model is required.";

  const year = Number(form.year);
  if (!form.year.trim() || Number.isNaN(year) || year < 1900 || year > 2100) {
    errors.year = "Enter a valid year.";
  }

  if (form.mileage.trim() && Number.isNaN(Number(form.mileage))) {
    errors.mileage = "Mileage must be a number.";
  }
  if (form.priceDisplay.trim() && Number.isNaN(Number(form.priceDisplay))) {
    errors.priceDisplay = "Price must be a number.";
  }
  if (form.priceCompareAt.trim() && Number.isNaN(Number(form.priceCompareAt))) {
    errors.priceCompareAt = "Price must be a number.";
  }

  return errors;
}

interface VehicleFormProps {
  mode: "create" | "edit";
  vehicle?: Vehicle;
}

export function VehicleForm({ mode, vehicle }: VehicleFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(vehicle));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Stable per-mount folder for photo uploads on a not-yet-created vehicle.
  const draftId = useMemo(() => crypto.randomUUID(), []);
  const storageFolder = `vehicles/${vehicle?.id ?? draftId}`;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      const input = buildInput(form);
      if (mode === "create") {
        await createVehicleAction(input);
        toast.success("Vehicle created.");
      } else if (vehicle) {
        await updateVehicleAction(vehicle.id, input);
        toast.success("Vehicle updated.");
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setSubmitError("Something went wrong saving this vehicle. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {submitError ? (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Basic details</CardTitle>
          <CardDescription>The core identity of this listing.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              value={form.make}
              onChange={(e) => update("make", e.target.value)}
              placeholder="Toyota"
              aria-invalid={Boolean(errors.make)}
            />
            {errors.make ? <p className="text-xs text-destructive">{errors.make}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={form.model}
              onChange={(e) => update("model", e.target.value)}
              placeholder="Camry"
              aria-invalid={Boolean(errors.model)}
            />
            {errors.model ? <p className="text-xs text-destructive">{errors.model}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              inputMode="numeric"
              value={form.year}
              onChange={(e) => update("year", e.target.value)}
              placeholder="2024"
              aria-invalid={Boolean(errors.year)}
            />
            {errors.year ? <p className="text-xs text-destructive">{errors.year}</p> : null}
          </div>

          <div className="flex flex-col gap-2 sm:col-span-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="A well-maintained one-owner vehicle with a clean history..."
              rows={5}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => update("status", value as FormState["status"])}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
          <CardDescription>Details buyers use to compare vehicles.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              inputMode="numeric"
              value={form.mileage}
              onChange={(e) => update("mileage", e.target.value)}
              placeholder="32,500"
              aria-invalid={Boolean(errors.mileage)}
            />
            {errors.mileage ? (
              <p className="text-xs text-destructive">{errors.mileage}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="transmission">Transmission</Label>
            <Select
              value={form.transmission}
              onValueChange={(value) => update("transmission", value as Transmission)}
            >
              <SelectTrigger id="transmission" className="w-full">
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="fuelType">Fuel type</Label>
            <Select
              value={form.fuelType}
              onValueChange={(value) => update("fuelType", value as FuelType)}
            >
              <SelectTrigger id="fuelType" className="w-full">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                {FUEL_TYPES.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bodyType">Body type</Label>
            <Input
              id="bodyType"
              value={form.bodyType}
              onChange={(e) => update("bodyType", e.target.value)}
              placeholder="Sedan"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="exteriorColor">Exterior color</Label>
            <Input
              id="exteriorColor"
              value={form.exteriorColor}
              onChange={(e) => update("exteriorColor", e.target.value)}
              placeholder="Midnight Blue"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="interiorColor">Interior color</Label>
            <Input
              id="interiorColor"
              value={form.interiorColor}
              onChange={(e) => update("interiorColor", e.target.value)}
              placeholder="Black leather"
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-3">
            <Label htmlFor="vin">VIN</Label>
            <Input
              id="vin"
              value={form.vin}
              onChange={(e) => update("vin", e.target.value)}
              placeholder="1HGCM82633A004352"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>
            The display price is shown large as the headline price; the regular
            price appears struck through next to it.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="priceDisplay">Primary display price</Label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                $
              </span>
              <Input
                id="priceDisplay"
                inputMode="decimal"
                value={form.priceDisplay}
                onChange={(e) => update("priceDisplay", e.target.value)}
                placeholder="24,900"
                className="pl-6 text-lg font-semibold"
                aria-invalid={Boolean(errors.priceDisplay)}
              />
            </div>
            {errors.priceDisplay ? (
              <p className="text-xs text-destructive">{errors.priceDisplay}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="priceCompareAt">Regular / compare-at price</Label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                $
              </span>
              <Input
                id="priceCompareAt"
                inputMode="decimal"
                value={form.priceCompareAt}
                onChange={(e) => update("priceCompareAt", e.target.value)}
                placeholder="27,500"
                className="pl-6"
                aria-invalid={Boolean(errors.priceCompareAt)}
              />
            </div>
            {errors.priceCompareAt ? (
              <p className="text-xs text-destructive">{errors.priceCompareAt}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photos</CardTitle>
          <CardDescription>Upload as many photos as you&apos;d like.</CardDescription>
        </CardHeader>
        <CardContent>
          <PhotoUploader
            photos={form.photos}
            onChange={(photos) => update("photos", photos)}
            storageFolder={storageFolder}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard")}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin" /> : null}
          {mode === "create" ? "Create vehicle" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
