import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen.container';
import {Provider, useSelector} from 'react-redux';
import store from '../../../redux/store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('HomeScreen Component', () => {
  beforeEach(() => {
    (useSelector as any).mockClear();
  });

  test('renders component with movies list from state', () => {
    const mockMovies = [
      {id: 1, original_title: 'Movie 1', title: 'movie1', poster_path: ''},
      {id: 2, original_title: 'Movie 2', title: 'movie2', poster_path: ''},
    ];
    useSelector.mockReturnValue(mockMovies);
    const {getByText} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );
    const textElement = getByText('movie2');
    expect(textElement).toBeDefined();
  });
});
