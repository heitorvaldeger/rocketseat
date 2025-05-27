import { HeaderContainer, HeaderLogoImage } from "./styles"

export const Header = () => {
  return (
    <HeaderContainer>
      <img src="/images/effect-header-left.svg" />
      <HeaderLogoImage src="/images/github-blog-logo.svg" />
      <img src="/images/effect-header-right.svg" />
    </HeaderContainer>
  )
}