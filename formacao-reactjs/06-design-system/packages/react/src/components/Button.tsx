import { styled } from '../styles'
import { StyledComponent } from '@stitches/react/types/styled-component'

export const Button = styled('button', {
  all: 'unset',
  borderRadius: '$sm',
  fontSize: '$sm',
  fontWeight: '$medium',
  fontFamily: '$default',
  textAlign: 'center',
  minWidth: 120,
  boxSizing: 'border-box',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',

  cursor: 'pointer',

  svg: {
    width: '$4',
    height: '$4',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      primary: {
        color: '$white',
        background: '$ignite500',

        '&:not(:disabled):hover': {
          background: '$ignite300',
        },
        '&:disabled': {
          background: '$gray200',
        },
      },

      secondary: {
        color: '$ignite300',
        border: '2px solid $ignite500',

        '&:not(:disabled):hover': {
          background: '$ignite500',
          color: '$white',
        },
        '&:disabled': {
          color: '$gray200',
          borderColor: '$gray200',
        },
      },

      tertiary: {
        color: '$gray100',
        '&:not(:disabled):hover': {
          color: '$white',
        },
        '&:disabled': {
          color: '$gray600',
          borderColor: '$gray200',
        },
      },
    },

    size: {
      sm: {
        padding: '0 $4',
        height: 38,
      },
      md: {
        padding: '0 $4',
        height: 46,
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export interface ButtonProps extends StyledComponent<typeof Button> {}

Button.displayName = 'Button'
