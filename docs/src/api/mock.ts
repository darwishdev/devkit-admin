import type { ApiListOptions } from 'devkit-admin/datalist';
import iconsResponse from './icons.ts'

export type UserListReqeuest = {
}
export type User = {
  userId: number;
  userName: string;
  userSecurityLevel: number;
  userPhone: string;
  userEmail: string;
  createdAt?: string;
  deletedAt?: string;
}
export type UserListResponse = {
  records: User[]
  deletedRecords?: User[]
  options?: ApiListOptions
}
export const apiClient: { iconList: (req: unknown) => Promise<typeof iconsResponse> } = {
  iconList: (_req: unknown) => new Promise((r) => r(iconsResponse))
}
