import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Security: undefined;
  Onboard: undefined;
};

export type HomeTabParamList = {
  Assets: NavigatorScreenParams<RootStackParamList>;
  Earn: undefined;
  Swap: undefined;
  Activity: undefined;
};

export type SecurityStackParamList = {
  Overview: undefined;
};

export type SettingsStackParamList = {
  Overview: undefined;
};

export type OnboardStackParamList = {
  CreateWallet: undefined;
};
