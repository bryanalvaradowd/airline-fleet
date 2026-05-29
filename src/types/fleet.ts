export type ProductionDate = {
  registration: string;
  date: string;
};

export type SeatDimension = {
  travelClass: string;
  seatPitch: string;
  seatWidth: string;
  aisleArmrestsRise?: string;
  recline?: string;
  seatBeltLength: string;
};

export type FleetSpecs = {
  numberOfAircraft: string;
  seatingCapacity: string;
  length: string;
  wingSpan: string;
  cruisingSpeed: string;
  maxCruisingAltitude: string;
};

export type SeatMap = {
  label: string;
  url: string;
};

export type Fleet = {
  id: string;
  model: string;
  shortDescription: string;
  description: string;
  specs: FleetSpecs;
  seatDimensions: SeatDimension[];
  seatMaps: SeatMap[];
  productionDates: ProductionDate[];
};

export type FleetFile = {
  fleet: Fleet[];
};

export type FleetAsset = {
  fleetId: string;
  image: string;
  cabinImage?: string;
};

export type FleetAssetsFile = {
  assets: FleetAsset[];
};

export type FleetWithAssets = Fleet & {
  assets?: FleetAsset;
};
