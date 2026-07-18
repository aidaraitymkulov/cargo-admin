export const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '').replace(/^996/, '')
  return `+996${digits.slice(0, 9)}`
}
