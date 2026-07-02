import { api } from '@/lib/services/http'

export interface ContactFormData {
  name: string
  email: string
  role: string
  company: string
  website?: string
  phone?: string
  message: string
  intent?: string
  service?: string
  size?: string
  variant?: string
  urgency?: string
  language?: string
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  await api.post('/contact/', data)
}
