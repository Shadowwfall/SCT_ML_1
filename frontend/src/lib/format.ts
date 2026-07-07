export const formatCurrency = (val: number, maximumFractionDigits = 0): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(val);
};

export const formatPriceImpact = (val: number, maximumFractionDigits = 0): string => {
  const prefix = val >= 0 ? "+" : "";
  return `${prefix}${formatCurrency(val, maximumFractionDigits)}`;
};

export const formatPercentage = (val: number, decimalPlaces = 2): string => {
  return `${(val * 100).toFixed(decimalPlaces)}%`;
};

export const formatNumber = (val: number, maximumFractionDigits = 0): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(val);
};

export const formatFeatureValue = (key: string, val: number): string => {
  if (key === "square_footage" || key === "lot_size") {
    return `${formatNumber(val)} sq ft`;
  }
  if (key === "property_age") {
    return `${val} years old`;
  }
  if (key === "neighborhood_rating" || key === "school_rating") {
    return `${val.toFixed(1)}/10`;
  }
  return val.toString();
};

export const formatImpactPerUnit = (val: number, unit: string): string => {
  const isLarge = Math.abs(val) >= 1000;
  const formatted = formatPriceImpact(val, isLarge ? 0 : 2);
  return `${formatted} / ${unit}`;
};
