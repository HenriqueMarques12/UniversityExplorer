import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null
}));

import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('permite entrada de texto e chama onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={onChangeText} onClear={jest.fn()} />
    );
    
    const input = getByPlaceholderText('Digite o nome da universidade...');
    fireEvent.changeText(input, 'Harvard');
    
    expect(onChangeText).toHaveBeenCalledWith('Harvard');
  });

});
