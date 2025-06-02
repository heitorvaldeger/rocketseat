import type { StoryObj, Meta } from '@storybook/react'
import { Button, type ButtonProps } from '@ignite-ui/react'
import { ArrowRightIcon } from '@phosphor-icons/react'

export default {
  title: 'Form/Button',
  component: Button,
  args: {
    disabled: false,
    children: 'Send',
    size: 'md',
    variant: 'primary'
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'inline-radio'
      },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: {
        type: 'inline-radio'
      },
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    onClick: {
      action: 'click'
    }
  }
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {}

export const Secondary: StoryObj<ButtonProps> = {
  args: {
    variant: 'secondary',
    children: 'Create new'
  }
}

export const Tertiary: StoryObj<ButtonProps> = {
  args: {
    variant: 'tertiary',
    children: 'Cancel'
  }
}

export const Small: StoryObj<ButtonProps> = {
  args: {
    size: 'sm',
  }
}

export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    children: (
      <>
        With Icon
        <ArrowRightIcon weight='bold'  />
      </>
    )
  }
}

export const Disabled: StoryObj<ButtonProps> = {
  args: {
    disabled: true,
  }
}