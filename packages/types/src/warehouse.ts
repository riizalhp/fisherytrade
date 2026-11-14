export type WarehouseCode = 'JKT-01' | 'LMG-01' | 'DPS-01' | 'BTG-01';
export type ColdStorageCode = WarehouseCode;

export interface Warehouse {
  id: string;
  name: string;
  code: WarehouseCode;
  city: string;
  province: string;
  address: string;
  capacityTons: number;
  currentOccupancyTons: number;
  operationalStatus?: string;
  temperatureStandard?: string;
  picName: string;
  picPhone: string;
}

export type ColdStorage = Warehouse;
