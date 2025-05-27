import * as Dialog from "@radix-ui/react-dialog"
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles"
import { NewTransactionModal } from "../NewTransactionModal"

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src="/images/logo-dt-money.svg" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}