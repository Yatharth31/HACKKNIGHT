import { create } from 'zustand'

export type SliderValues = {
  loanAmount: number
  repaymentPeriod: number
  interestRate: number
}

export type SliderState = SliderValues & {
  setSliderValue: (name: string, value: number) => void
  resetSliders: () => void
}

export const useSliderStore = create<SliderState>((set) => ({
  loanAmount: 1000,
  repaymentPeriod: 3,
  interestRate: 5,
  setSliderValue: (name, value) => set((prev) => ({ ...prev, [name]: value })),
  resetSliders: () => {
    set({
      loanAmount: 1000,
      repaymentPeriod: 3,
      interestRate: 5,
    })
  },
}))
