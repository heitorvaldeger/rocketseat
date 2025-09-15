import { Box, styled, Text } from '@ignite-ui/react'

export const ConnectBox = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  marginTop: '$6',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$4',

  border: '1px solid $gray600',
  borderRadius: '$md',
  padding: '$4 $6',

  '> svg': {
    color: '$gray200',
  },

  variants: {
    status: {
      connected: {
        '> svg': {
          color: '$green400',
        },
      },
      disconnected: {
        '> svg': {
          color: '$red400',
        },
      },
    },
  },
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$2',
  fontWeight: '$bold',
})
