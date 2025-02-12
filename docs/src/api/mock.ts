import iconsResponse from './icons.ts'
export const apiClient: { iconList: (req: unknown) => Promise<typeof iconsResponse> } = {
  iconList: (_req: unknown) => new Promise((r) => r(iconsResponse))
}
