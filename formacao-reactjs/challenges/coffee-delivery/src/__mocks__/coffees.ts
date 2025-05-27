import { Coffee } from "@/models/coffee";

export const coffees: Coffee[] = [
  {
    id: 1,
    coverKey: 'coffee-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional']
  },
  {
    id: 2,
    coverKey: 'coffee-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional']
  },
  {
    id: 3,
    coverKey: 'coffee-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional']
  },
  {
    id: 4,
    coverKey: 'coffee-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Gelado']
  },
  {
    id: 5,
    coverKey: 'coffee-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Com Leite']
  },
  {
    id: 6,
    coverKey: 'coffee-latte',
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Com Leite']
  },
  {
    id: 7,
    coverKey: 'coffee-capuccino',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Com Leite']
  },
  {
    id: 8,
    coverKey: 'coffee-macchiato',
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Com Leite']
  },
  {
    id: 9,
    coverKey: 'coffee-mocaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Com Leite']
  },
  {
    id: 10,
    coverKey: 'coffee-chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    price: 9.90,
    qty: 1,
    badges: ['Tradicional', 'Com Leite']
  },
  {
    id: 12,
    coverKey: 'coffee-cubano',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    price: 9.90,
    qty: 1,
    badges: ['Especial', 'Alcóolico', 'Gelado']
  },
  {
    id: 13,
    coverKey: 'coffee-havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    price: 9.90,
    qty: 1,
    badges: ['Especial']
  },
  {
    id: 14,
    coverKey: 'coffee-arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    price: 9.90,
    qty: 1,
    badges: ['Especial']
  },
  {
    id: 15,
    coverKey: 'coffee-irlandes',
    name: 'Irlândes',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    price: 9.90,
    qty: 1,
    badges: ['Especial', 'Alcóolico']
  }
]