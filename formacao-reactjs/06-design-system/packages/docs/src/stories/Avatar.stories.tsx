import type { StoryObj, Meta } from '@storybook/react'
import { Avatar, type AvatarProps } from '@ignite-ui/react'

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  args: {
    src: 'https://github.com/heitorvaldeger.png'
  }
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {
}

export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined
  }
}