export const PRODUCT_STATUS = {
  IN_CHINA: 'IN_CHINA',
  ON_THE_WAY: 'ON_THE_WAY',
  IN_KG: 'IN_KG',
  DELIVERED: 'DELIVERED',
} as const

export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS]

export const productStatusLabel: Record<ProductStatus, string> = {
  IN_CHINA: 'В Китае',
  ON_THE_WAY: 'В пути',
  IN_KG: 'В КР',
  DELIVERED: 'Выдан',
}
