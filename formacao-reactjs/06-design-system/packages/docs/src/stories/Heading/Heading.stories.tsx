import type { StoryObj, Meta } from '@storybook/react'
import { Heading, type HeadingProps } from '@ignite-ui/react'

export default {
  title: 'Typography/Heading',
  component: Heading,
  args: {
    children: 'Custom title',
    size: 'md'
  },
  argTypes: {
    size: {
      options: ['sm','md','lg','xl','2xl','4xl','5xl','6xl'],
      control: {
        type: 'inline-radio'
      },
    },
  }
} satisfies Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 Heading',
    as: 'h1'
  },
  parameters: {
    docs: {
      description: {
        story: 'Por padrão o heading sempre será um `h2`, mas isso pode ser alterado com a propriedade `as`'
      }
    }
  }
}