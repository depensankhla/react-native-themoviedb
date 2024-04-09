import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import LoginScreen from '../LoginScreen.container';
import {Provider, useSelector} from 'react-redux';
import store from '../../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('LoginScreen Component', () => {
  beforeEach(() => {
    (useSelector as any).mockClear();
  });

  test('renders component with out any error', () => {
    const mockMovies = 'en';
    useSelector.mockReturnValue(mockMovies);
    const {getByText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const textElement = getByText('login.loginButton');
    expect(textElement).toBeDefined();
  });

  test('check login button eanble & email and password fields values', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );

    const emailInput = getByTestId('emailTestId');
    const passwordInput = getByTestId('passwordTestId');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const textElement = getByTestId('loginButtonTestId');
    expect(textElement.props.disabled).toBeFalsy();
  });
});
