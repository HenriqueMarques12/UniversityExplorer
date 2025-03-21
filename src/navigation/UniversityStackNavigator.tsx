import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UniversityListScreen } from '../screens/universities';
import { COLORS, FONTS } from '../config/theme';
import { UniversityDetailScreen } from '../screens/universityDetail';

export type UniversityStackParamList = {
  UniversityList: undefined;
  UniversityDetail: { id: string };
};

const Stack = createStackNavigator<UniversityStackParamList>();

export const UniversityStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="UniversityList"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          ...FONTS.medium,
        },
      }}
    >
      <Stack.Screen 
        name="UniversityList" 
        component={UniversityListScreen} 
        options={{ title: 'Universidades' }} 
      />
      <Stack.Screen 
        name="UniversityDetail" 
        component={UniversityDetailScreen} 
        options={({ route }) => ({ 
          title: 'Detalhes da Universidade'
        })} 
      />
    </Stack.Navigator> 
  );
};
