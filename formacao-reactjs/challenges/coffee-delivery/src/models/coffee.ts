export interface Coffee {
  id: number
  coverKey: string,
  name: string,
  description: string,
  price: number,
  qty: number,
  badges?: string[]
}