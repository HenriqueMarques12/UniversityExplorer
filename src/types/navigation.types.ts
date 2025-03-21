import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  UniversitiesTab: undefined;
  FavoritesTab: undefined;
  SettingsTab: undefined;
};

export type UniversityStackParamList = {
  UniversityList: undefined;
  UniversityDetail: { id: string };
};

export type UniversityListScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<UniversityStackParamList, 'UniversityList'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type UniversityDetailScreenNavigationProp = StackNavigationProp<
  UniversityStackParamList, 
  'UniversityDetail'
>;

export type FavoritesScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList, 
  'FavoritesTab'
>;

export type SettingsScreenNavigationProp = BottomTabNavigationProp<
  MainTabParamList, 
  'SettingsTab'
>;
