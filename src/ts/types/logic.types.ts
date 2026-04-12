export type ConvertOperation = {
  amount: number
  fromSelectBaseCurrency: string
  toSelectDesiredCurrency: string
  rates: Record<string, number>
  base: string
}

export type RatesResponse = {
  rates: Record<string, number>
  base: string
}