import { FaCalendarDay } from "react-icons/fa"
import { getDateFormated, getDateRelativeToNow } from "../../utils/formatter"

type IssueDateDisplayProps = {
  date: string,
  hasIcon?: boolean
}

export const IssueDateDisplay = ({ date, hasIcon = false }: IssueDateDisplayProps) => {
  return (
    <span title={getDateFormated(date)}>
      {hasIcon && <FaCalendarDay />}
      {getDateRelativeToNow(date)}
    </span>
  )
}