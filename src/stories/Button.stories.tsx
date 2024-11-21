import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from '../components/ui/Buttoncomp';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

const Template: StoryFn = (args) => <Button context={''} {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  context: 'Default Button',
  className: 'bg-blue-600 text-white hover:bg-blue-700',
};

export const AddThreadButton = Template.bind({});
AddThreadButton.args = {
  context: '+ Thread Baru',
  className: 'fixed m-5 right-0 bottom-0 px-8 py-4 bg-blue-800 text-blue-50 rounded-xl hover:bg-blue-600',
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  type: 'submit',
  context: 'Tambahkan',
  className: 'mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
};

export const LoginButton = Template.bind({});
LoginButton.args = {
  type: 'button',
  context: 'Login',
  onClick: () => alert('Login clicked'),
  className: 'w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ease-in-out',
};

export const RegisterButton = Template.bind({});
RegisterButton.args = {
  type: 'button',
  context: 'Register',
  onClick: () => alert('Register clicked'),
  className: 'w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-150 ease-in-out',
};

export const TambahkanThreadButton = Template.bind({});
TambahkanThreadButton.args = {
  type: 'submit',
  context: 'Tambahkan Thread',
  className: 'w-full bg-blue-800 text-blue-50 py-4 text-lg mt-5 font-bold px-4 rounded-lg hover:bg-blue-400 transition duration-300',
};
