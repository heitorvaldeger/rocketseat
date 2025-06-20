import { UserIcon } from '@phosphor-icons/react'
import { AvatarContainer, AvatarFallback, AvatarImage } from './styles'
import { ComponentProps } from 'react'

export interface AvatarProps extends ComponentProps<typeof AvatarImage> {}

export const Avatar = (props: AvatarProps) => {
  return (
    <AvatarContainer>
      <AvatarImage {...props} />

      <AvatarFallback delayMs={600}>
        <UserIcon />
      </AvatarFallback>
    </AvatarContainer>
  )
}

Avatar.displayName = 'Avatar'
