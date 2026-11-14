export type RFQStatus = 'PENDING' | 'QUOTED' | 'DEAL' | 'CANCELLED';

export interface RFQItem {
  commodityId: string;
  commodityName: string;
  processingCut: string;
  grade: string;
  freezingMethod?: string;
  packagingType?: string;
  requestedVolumeTons: number;
}

export interface RFQInquiry {
  id: string;
  rfqNumber: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  buyerEmail?: string;
  coldStorageSourceId: string;
  coldStorageName: string;
  warehouseSourceId?: string;
  warehouseName?: string;
  destinationCity: string;
  items: RFQItem[];
  totalVolumeTons: number;
  estimatedTruckFleet: string;
  estimatedShippingCostIdr: number;
  status: RFQStatus;
  createdAt: string;
}

export interface ShipperEstimationRequest {
  originColdStorageId?: string;
  originWarehouseId?: string;
  destinationCity: string;
  weightTons: number;
}

export interface ShipperEstimationResult {
  recommendedFleet: string;
  totalTrips: number;
  estimatedRatePerTripIdr: number;
  totalEstimatedFreightIdr: number;
  notes: string;
}
