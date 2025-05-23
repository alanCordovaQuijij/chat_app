import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../../hooks/useAuth';
import { UserInfo } from '../../components/Settings/UserInfo/UserInfo';

export const SettingsScreen = () => {

  const { logout } = useAuth();

  return (
    <SafeAreaView>
      <UserInfo />
    </SafeAreaView>
  )
}
