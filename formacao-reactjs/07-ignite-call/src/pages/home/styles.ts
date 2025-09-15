import { Heading, Text, styled } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - ((100vw - 1160px) / 2))',
  height: '100vh',
  marginLeft: 'auto',
  backgroundColor: '$gray900',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media (max-width: 600px)': { fontSize: '$6xl' },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
    lineHeight: 1.5,
  },
})

export const Preview = styled('div', {
  overflow: 'hidden',
  paddingRight: '$8',

  '@media (max-width: 768px)': { display: 'none' },
})
