import type { StoryObj, Meta } from '@storybook/react'
import { Box, Text, type BoxProps } from '@ignite-ui/react'

export default {
  title: 'Surfaces/Box',
  component: Box,
  args: {
    children: <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis praesentium eos vel. Alias, repellat doloribus asperiores quis fugit blanditiis, tenetur harum nulla libero saepe assumenda in pariatur accusamus! Mollitia, officiis?</Text>
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {
}