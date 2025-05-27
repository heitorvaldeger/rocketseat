import coffeeDeliveryLogo from '@/assets/images/coffee-delivery-logo.svg'
import { MapPin } from '@phosphor-icons/react'
import { ButtonBase, ButtonContainer, ButtonMap, HeaderContainer } from './styles'
import { CartHeaderButton } from '../CartHeaderButton'
import { useNavigate } from 'react-router-dom'
export const Header = () => {
  const navigate = useNavigate()

  return (
    <HeaderContainer>
      <ButtonBase onClick={() => navigate('/')}>
        <img src={coffeeDeliveryLogo} alt="Coffee Delivery Logo" />
      </ButtonBase>

      <ButtonContainer>
        <ButtonMap><MapPin size={22}/>João Pessoa, PB</ButtonMap>
        <CartHeaderButton />
      </ButtonContainer>
    </HeaderContainer>
  )
}