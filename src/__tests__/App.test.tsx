import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

test('ExampleComponent renders correctly', () => {
  const {getByText} = render(<App />);
  const textElement = getByText('login.loginButton');
  expect(textElement).toBeDefined();
});
