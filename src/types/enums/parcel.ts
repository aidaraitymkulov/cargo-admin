export const PARCEL_STATUS = {
  DELIVERED: 'DELIVERED',
  PENDING_PICKUP: 'PENDING_PICKUP',
} as const

export type ParcelStatus = (typeof PARCEL_STATUS)[keyof typeof PARCEL_STATUS]

export const parcelStatusLabel: Record<ParcelStatus, string> = {
  DELIVERED: 'Выдан',
  PENDING_PICKUP: 'Ожидает выдачи',
}
