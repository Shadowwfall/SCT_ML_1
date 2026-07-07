"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle, Sliders, Sparkles } from "lucide-react";
import { predictionSchema, type PredictionFormData } from "@/lib/schemas/prediction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface PropertyInputFormProps {
  onSubmit: (data: PredictionFormData) => void;
  isLoading?: boolean;
}

export function PropertyInputForm({ onSubmit, isLoading = false }: PropertyInputFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      square_footage: undefined,
      bedrooms: 3,
      bathrooms: 2,
      neighborhood_rating: 7,
      school_rating: 7,
      property_age: 10,
      lot_size: undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Living Area (Square Footage) */}
        <div className="space-y-2">
          <Label htmlFor="square_footage" className="text-ink-900 font-semibold text-sm">
            Square Footage (Living Area)
          </Label>
          <Input
            id="square_footage"
            type="number"
            placeholder="e.g. 2000"
            disabled={isLoading}
            aria-invalid={!!errors.square_footage}
            className="h-10"
            {...register("square_footage", { valueAsNumber: true })}
          />
          {errors.square_footage && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.square_footage.message}
            </p>
          )}
        </div>

        {/* Lot Size */}
        <div className="space-y-2">
          <Label htmlFor="lot_size" className="text-ink-900 font-semibold text-sm">
            Lot Size (Sq. Ft.)
          </Label>
          <Input
            id="lot_size"
            type="number"
            placeholder="e.g. 5000"
            disabled={isLoading}
            aria-invalid={!!errors.lot_size}
            className="h-10"
            {...register("lot_size", { valueAsNumber: true })}
          />
          {errors.lot_size && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.lot_size.message}
            </p>
          )}
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="text-ink-900 font-semibold text-sm">
            Bedrooms
          </Label>
          <Input
            id="bedrooms"
            type="number"
            placeholder="e.g. 3"
            disabled={isLoading}
            aria-invalid={!!errors.bedrooms}
            className="h-10"
            {...register("bedrooms", { valueAsNumber: true })}
          />
          {errors.bedrooms && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.bedrooms.message}
            </p>
          )}
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label htmlFor="bathrooms" className="text-ink-900 font-semibold text-sm">
            Bathrooms
          </Label>
          <Input
            id="bathrooms"
            type="number"
            step="0.5"
            placeholder="e.g. 2.5"
            disabled={isLoading}
            aria-invalid={!!errors.bathrooms}
            className="h-10"
            {...register("bathrooms", { valueAsNumber: true })}
          />
          {errors.bathrooms && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.bathrooms.message}
            </p>
          )}
        </div>

        {/* Property Age */}
        <div className="space-y-2">
          <Label htmlFor="property_age" className="text-ink-900 font-semibold text-sm">
            Property Age (Years)
          </Label>
          <Input
            id="property_age"
            type="number"
            placeholder="e.g. 15"
            disabled={isLoading}
            aria-invalid={!!errors.property_age}
            className="h-10"
            {...register("property_age", { valueAsNumber: true })}
          />
          {errors.property_age && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.property_age.message}
            </p>
          )}
        </div>

        <div className="hidden md:block" aria-hidden="true" />

        {/* Neighborhood Quality Rating Slider */}
        <div className="space-y-3 col-span-1 md:col-span-2 border-t border-border pt-4 mt-2">
          <div className="flex justify-between items-center">
            <Label className="text-ink-900 font-semibold text-sm flex items-center gap-1.5">
              Neighborhood Rating
              <span className="text-xs font-normal text-ink-600 bg-muted px-2 py-0.5 rounded-full">
                1–10 Scale
              </span>
            </Label>
            <Controller
              control={control}
              name="neighborhood_rating"
              render={({ field }) => (
                <span className="text-sm font-bold text-primary px-2.5 py-1 bg-primary-light rounded-md">
                  {field.value?.toFixed(1)}/10
                </span>
              )}
            />
          </div>
          <Controller
            control={control}
            name="neighborhood_rating"
            render={({ field: { value, onChange } }) => (
              <div className="py-2">
                <Slider
                  value={[value ?? 7]}
                  onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
                  min={1}
                  max={10}
                  step={0.5}
                  disabled={isLoading}
                />
              </div>
            )}
          />
          {errors.neighborhood_rating && (
            <p className="text-xs text-destructive">
              {errors.neighborhood_rating.message}
            </p>
          )}
        </div>

        {/* School District Rating Slider */}
        <div className="space-y-3 col-span-1 md:col-span-2">
          <div className="flex justify-between items-center">
            <Label className="text-ink-900 font-semibold text-sm flex items-center gap-1.5">
              School District Rating
              <span className="text-xs font-normal text-ink-600 bg-muted px-2 py-0.5 rounded-full">
                1–10 Scale
              </span>
            </Label>
            <Controller
              control={control}
              name="school_rating"
              render={({ field }) => (
                <span className="text-sm font-bold text-primary px-2.5 py-1 bg-primary-light rounded-md">
                  {field.value?.toFixed(1)}/10
                </span>
              )}
            />
          </div>
          <Controller
            control={control}
            name="school_rating"
            render={({ field: { value, onChange } }) => (
              <div className="py-2">
                <Slider
                  value={[value ?? 7]}
                  onValueChange={(val) => onChange(Array.isArray(val) ? val[0] : val)}
                  min={1}
                  max={10}
                  step={0.5}
                  disabled={isLoading}
                />
              </div>
            )}
          />
          {errors.school_rating && (
            <p className="text-xs text-destructive">
              {errors.school_rating.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          variant="default"
          size="lg"
          className="w-full h-12 shadow-sm font-semibold hover:scale-[1.01] active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating Valuation...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Calculate Estimated Value
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
