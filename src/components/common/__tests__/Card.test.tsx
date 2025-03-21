import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '../Card';
import { Text } from 'react-native';

describe('Card Component', () => {
  it('renders correctly with children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('applies custom style when provided', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Card style={customStyle} testID="card">
        <Text>Styled Card</Text>
      </Card>
    );
    
    const card = getByTestId('card');
    
    const styles = card.props.style;
    const hasCustomBackground = styles.some((style: { backgroundColor: string; }) => 
      style.backgroundColor === 'red'
    );
    
    expect(hasCustomBackground).toBeTruthy();
  });
});
