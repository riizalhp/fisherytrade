export type ColdStorageCode = 'JKT-01' | 'LMG-01' | 'DPS-01' | 'BTG-01';

export interface ColdStorage {
  id: string;
  name: string;
  code: ColdStorageCode;
  city: string;
  province: string;
  address: string;
  capacityTons: number;
  currentOccupancyTons: number;
  temperatureStandard: string;
  picName: string;
  picPhone: string;
}
