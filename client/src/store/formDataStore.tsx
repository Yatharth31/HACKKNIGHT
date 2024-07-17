import { create } from 'zustand'

type FormDataState = {
  userId: string
  fullName: string
  email: string
  password: string
  role: string
  dateOfBirth: string
  bio: string
  location: string
  loanAmount: number
  interestRate: number
  repaymentPeriod: number
  updateField: (field: string, value: string | number) => void
}

export const useFormDataStore = create<FormDataState>((set) => ({
  userId: '',
  fullName: '',
  email: '',
  password: '',
  role: '',
  dateOfBirth: '1994-01-01',
  bio: '',
  location: '',
  loanAmount: 0,
  interestRate: 0.0,
  repaymentPeriod: 0,
  updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
}))
