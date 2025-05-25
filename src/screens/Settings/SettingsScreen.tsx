import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../../hooks/useAuth';
import { UserInfo } from '../../components/Settings/UserInfo/UserInfo';
import { Options } from '../../components/Settings/options/Options';


export const SettingsScreen = () => {

  const { user, logout, accesToken, updateUser} = useAuth();

  return (
    <SafeAreaView style= {{flex: 1 , backgroundColor: '#000'}}>
      <UserInfo user={user}/>
      <Options accesToken = {accesToken} logout={logout} updateUser={updateUser}/>
    </SafeAreaView>
  )
}
