
import type { Meta, StoryObj } from '@storybook/vue3';
import { AppHeader } from 'devkit-base-components'
import type { MenuItem } from 'primevue/menuitem';

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Navigation items for the header menu.',
      defaultValue: [],
    },
    hideLocalSwitch: {
      control: 'boolean',
      description: 'Toggle to hide or show the locale switcher.',
    },
    logo: {
      control: 'object',
      description: 'Logo configuration (either string URL or an object with src, type, and size).',
      defaultValue: { src: 'https://via.placeholder.com/150', type: 'image' },
    },
  },
  args: {
    items: [
      { label: 'Home', route: '/' },
      { label: 'About', route: '/about' },
      { label: 'Contact', route: '/contact' },
    ] as MenuItem[],
    hideLocalSwitch: false,
    logo: { src: 'https://via.placeholder.com/150', type: 'image' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      { label: 'Home', route: '/' },
      { label: 'About', route: '/about' },
      { label: 'Contact', route: '/contact' },
    ],
    hideLocalSwitch: false,
    logo: { src: 'https://via.placeholder.com/150', type: 'image' },
  },
};

