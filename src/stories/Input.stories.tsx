import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Input from '../components/ui/Inputcomp';
import '../styles/style.css'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
};

export default meta;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const NameInput = Template.bind({});
NameInput.args = {
  type: 'text',
  value: 'John Doe',
  placeholder: 'Enter your name',
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  type: 'email',
  value: 'example@gmail.com',
  placeholder: 'Enter your email',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  type: 'password',
  value: '********',
  placeholder: 'Enter your password',
};
