
import type { Meta, StoryObj } from '@storybook/vue3';
import { AppHeader, type AppHeaderProps } from 'devkit-base-components'
import type { MenuItem } from 'primevue/menuitem';


type StoryMenuItem = Pick<MenuItem, 'label' | 'icon' | 'route' | 'target' | 'items'> & { labelAr?: string };

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
      { label: 'Home', labelAr: 'الرئيسية', route: '/' },
      { label: 'About Us', labelAr: 'عن الشركة', route: '/about' },
      {
        label: 'Services', labelAr: 'الخدمات', route: '',
        items: [
          { label: 'Hotel Management', route: '/services#13' },
          { label: 'Hospitality Services', route: '/services#14' },
          { label: 'Food and Beverage', route: '/services#15' },
          { label: 'Consultancy', route: '/services#16' },
        ]
      },
      { label: 'Gallery', labelAr: 'الاستوديو', route: '/gallery' },
    ] as StoryMenuItem[],
    hideLocalSwitch: false,
    logo: 'https://via.placeholder.com/150',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary2: Story = { args: { ...meta.args } };
export const IconLogo: Story = { args: { ...meta.args, logo: { src: 'pi pi-home', type: 'icon' } as any } };
export const HiddenToggler: Story = { args: { ...meta.args, hideLocalSwitch: true } };
export const NestedItems: Story = {
  args: {
    ...meta.args, items: [
      { label: 'Home', labelAr: 'الرئيسية', route: '/' },
      { label: 'About Us', labelAr: 'عن الشركة', route: '/about' },
      {
        label: 'Services',
        labelAr: 'الخدمات',
        route: '',
        items: [
          {
            label: 'Hotel Management',
            labelAr: 'إدارة الفنادق',
            route: '/services#13',
            items: [ // Third-level items under "Hotel Management"
              { label: 'Hotel Booking', labelAr: 'حجز الفنادق', route: '/services/hotel/booking' },
              { label: 'Hotel Reviews', labelAr: 'تقييمات الفنادق', route: '/services/hotel/reviews' },
            ]
          },
          { label: 'Hospitality Services', labelAr: 'خدمات الضيافة', route: '/services#14' },
          { label: 'Food and Beverage', labelAr: 'الطعام والشراب', route: '/services#15' },
          { label: 'Consultancy', labelAr: 'الاستشارات', route: '/services#16' },
        ]
      },
      { label: 'Gallery', labelAr: 'الاستوديو', route: '/gallery' },
    ] as StoryMenuItem[]
  }
};

