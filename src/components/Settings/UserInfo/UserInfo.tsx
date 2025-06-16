import React from 'react'
import { Avatar, Text } from 'react-native-paper'
import { View } from 'react-native'
import { userInfoStyles } from './UserInfo.styles'
import { ENV } from '../../../utils/constanst'
import { IUser } from '../../../api/auth/user'

interface Iprops {
    user:  IUser | null
}


export const UserInfo = ({user}: Iprops) => {

    console.log("USERINFO==>", user)

  if (!user) {
    return <Avatar.Text size={48} label="??" />;
  }

  const initials = `${user.firstname[0] ?? ''}${user.lastname[0] ?? ''}`.toUpperCase();
  const fullName = `${user?.firstname ?? 'Nombre'} ${user?.lastname ?? 'Apellido'}`;



  return (
    <View style={userInfoStyles.content}>
      {user?.avatar ? (
        <Avatar.Image size={64} source={{ uri: `${ENV.BASE_PATH}/${user.avatar}` }} style={userInfoStyles.avatar} />
      ) : (
        <Avatar.Text size={64} label={initials} style={userInfoStyles.avatar} />
      )}
      <Text style={userInfoStyles.indentity}>{fullName}</Text>
    
     <Text style={userInfoStyles.email}>{user.email}</Text>
    </View>
  );
}
