import type { StoryObj, Meta } from '@storybook/react'
import { Text, type TextProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati et reiciendis quibusdam aspernatur suscipit tenetur deserunt! Dignissimos numquam ex sapiente consequuntur quaerat natus esse ratione, aspernatur eveniet voluptate consectetur magni.'
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}