import { z } from 'zod';

const ProductionDateSchema = z.object({
  registration: z.string(),
  date: z.string(),
});

const SeatDimensionSchema = z.object({
  travelClass: z.string(),
  seatPitch: z.string(),
  seatWidth: z.string(),
  aisleArmrestsRise: z.string().optional(),
  recline: z.string().optional(),
  seatBeltLength: z.string(),
});

const FleetSpecsSchema = z.object({
  numberOfAircraft: z.string(),
  seatingCapacity: z.string(),
  length: z.string(),
  wingSpan: z.string(),
  cruisingSpeed: z.string(),
  maxCruisingAltitude: z.string(),
});

export const FleetSchema = z.object({
  id: z.string().min(1),
  model: z.string().min(1),
  shortDescription: z.string(),
  description: z.string(),
  specs: FleetSpecsSchema,
  seatDimensions: z.array(SeatDimensionSchema),
  seatMaps: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })),
  productionDates: z.array(ProductionDateSchema),
});

export const FleetFileSchema = z.object({
  fleet: z.array(FleetSchema),
});

export const FleetAssetSchema = z.object({
  fleetId: z.string().min(1),
  image: z.string(),
  cabinImage: z.string().optional(),
});

export const FleetAssetsFileSchema = z.object({
  assets: z.array(FleetAssetSchema),
});

export type Fleet = z.infer<typeof FleetSchema>;
export type FleetSpecs = z.infer<typeof FleetSpecsSchema>;
export type SeatDimension = z.infer<typeof SeatDimensionSchema>;
export type ProductionDate = z.infer<typeof ProductionDateSchema>;
export type FleetFile = z.infer<typeof FleetFileSchema>;
export type FleetAsset = z.infer<typeof FleetAssetSchema>;
export type FleetAssetsFile = z.infer<typeof FleetAssetsFileSchema>;
