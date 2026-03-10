export interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  superAdminOnly?: boolean
  children?: { label: string; href: string }[]
}
