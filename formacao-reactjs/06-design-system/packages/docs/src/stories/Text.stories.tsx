import type { StoryObj, Meta } from '@storybook/react'
import { Text, type TextProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    size: 'md',
    children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati et reiciendis quibusdam aspernatur suscipit tenetur deserunt! Dignissimos numquam ex sapiente consequuntur quaerat natus esse ratione, aspernatur eveniet voluptate consectetur magni.'
  },
  argTypes: {
    size: {
      options: ['xxs','xs','sm','md','lg','xl','2xl','4xl','5xl','6xl','7xl','8xl','9xl'],
      control: {
        type: 'inline-radio'
      },
    },
  }
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}