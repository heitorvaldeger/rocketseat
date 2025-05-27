import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export const getDateRelativeToNow = (date: string) =>
  formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  })

export const getDateFormated = (date: string) =>
  format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })