type ClassValue = string | number | boolean | null | undefined | ClassValue[]

function flatten(val: ClassValue): string[] {
  if (!val && val !== 0) return []
  if (Array.isArray(val)) return val.flatMap(flatten)
  return [String(val)]
}

export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(flatten).filter(Boolean).join(' ')
}
