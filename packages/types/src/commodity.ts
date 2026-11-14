export type ProcessingCut = 'Whole Round' | 'Whole G&G' | 'Fillet' | 'Loin' | 'Steak' | 'HOSO' | 'HLSO';
export type FreezingMethod = 'IQF' | 'Air Blast' | 'Contact Plate';
export type FishGrade = 'Grade A' | 'Grade B' | 'Grade Export';
export type FishCategory = 'Pelagis' | 'Demersal' | 'Crustacea' | 'Cephalopoda';

export interface Commodity {
  id: string;
  name: string;
  englishName: string;
  scientificName: string;
  category: FishCategory;
  slug: string;
  imageUrl: string;
  description: string;
}

export interface ProductSpec {
  id: string;
  commodityId: string;
  processingCut: ProcessingCut;
  freezingMethod: FreezingMethod;
  grade: FishGrade;
  sizeSpecs: string;
  moqKg: number;
  pricePerKg?: number;
  isPriceVisible: boolean;
}
