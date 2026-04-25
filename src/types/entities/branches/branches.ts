export interface Branch {
  id: string
  address: string
  personalCodePrefix: string
  isActive: boolean
}

export type CreateBranchDto = {
  address: string
  personalCodePrefix: string
}

export type UpdateBranchDto = Partial<CreateBranchDto>
