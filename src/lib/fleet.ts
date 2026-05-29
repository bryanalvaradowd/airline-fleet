import fleetJson from '../data/fleet.json';
import fleetAssetsJson from '../data/fleet-assets.json';
import type { FleetWithAssets } from '../types/fleet';
import { FleetFileSchema, FleetAssetsFileSchema } from '../schemas/fleet';

const fleetFile = FleetFileSchema.parse(fleetJson);
const assetsFile = FleetAssetsFileSchema.parse(fleetAssetsJson);

export const fleetData = fleetFile.fleet;
export const fleetAssets = assetsFile.assets;

const assetsByFleetId = new Map(assetsFile.assets.map((a) => [a.fleetId, a] as const));

export const fleetWithAssets: FleetWithAssets[] = fleetData.map((f) => ({
  ...f,
  assets: assetsByFleetId.get(f.id),
}));

export function formatSpecs(specs: { numberOfAircraft: string; seatingCapacity: string }): string {
  return `${specs.numberOfAircraft} aircraft · ${specs.seatingCapacity} seats`;
}
