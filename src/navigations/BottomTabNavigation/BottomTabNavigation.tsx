import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {screens} from '../../utils/screens';
import {ChatsNavigation} from '../stacks/ChatsNavigation';
import {GroupsNavigation} from '../stacks/GroupsNavigation';
import {SettingsNavigation} from '../stacks/SettingsNavigation';
import {BottomTabNavigationStyles} from './BottomTabNavigationStyles';
import {Icon} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
interface RouteInterface {
  name: string;
  key: string;
}

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: BottomTabNavigationStyles.tabBarStyle,
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#646464',
        tabBarIcon: ({color, size}) => screenIcon(route, color, size),
      })}>
      <Tab.Screen
        name={screens.tab.chats.root}
        component={ChatsNavigation}
        options={{title: 'Chats'}}
      />
      <Tab.Screen
        name={screens.tab.groups.root}
        component={GroupsNavigation}
        options={{title: 'Grupos'}}
      />
      <Tab.Screen
        name={screens.tab.settings.root}
        component={SettingsNavigation}
        options={{title: 'Ajustes'}}
      />
    </Tab.Navigator>
  );
};

const screenIcon = (route: RouteInterface, color: string, size: number) => {
  let iconName = '';

  //console.log('route====>', JSON.stringify(route));

  if (route.name === screens.tab.chats.root) {
    iconName = 'chat';
  }

  if (route.name === screens.tab.groups.root) {
    iconName = 'account-group';
  }

  if (route.name === screens.tab.settings.root) {
    iconName = 'cog-outline';
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
};
