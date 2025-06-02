import { styled } from '../styles'
import { StyledComponent } from '@stitches/react/types/styled-component'

export const Box = styled('div', {
  padding: '$4',
  borderRadius: '$md',
  backgroundColor: '$gray800',
  border: '1px splid $gray600',
})

export interface BoxProps extends StyledComponent<typeof Box> {}

Box.displayName = 'Box'
