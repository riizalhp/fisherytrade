export type AgingAlertLevel = 'NORMAL' | 'WARNING_45_DAYS' | 'CRITICAL_90_DAYS';

export interface BatchInventory {
  id: string;
  batchCode: string;
  coldStorageId: string;
  productSpecId: string;
  commodityName: string;
  processingCut: string;
  grade: string;
  freezingMethod: string;
  inboundDate: string;
  daysInStorage: number;
  agingStatus: AgingAlertLevel;
  initialWeightKg: number;
  availableWeightKg: number;
  supplierName: string;
  storageLocationBin: string;
}

export type MovementType = 'INBOUND_PURCHASE' | 'OUTBOUND_SALE' | 'OPNAME_ADJUSTMENT' | 'GLAZING_LOSS';

export type VarianceReasonCode =
  | 'GLAZING_LOSS'
  | 'DRIP_LOSS'
  | 'PACKAGING_DAMAGE'
  | 'QUALITY_DEGRADATION'
  | 'COUNT_ERROR';

export interface StockMovement {
  id: string;
  batchId: string;
  type: MovementType;
  quantityKg: number;
  reasonCode?: VarianceReasonCode;
  notes?: string;
  referenceNumber?: string;
  createdAt: string;
  createdBy: string;
}
