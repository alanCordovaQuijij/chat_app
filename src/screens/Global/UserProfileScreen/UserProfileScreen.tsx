import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { IUser, UserController } from '../../../api/auth/user';
import { UserInfo } from '../../../components/Settings/UserInfo/UserInfo';
import { userProfileStyle } from './UserProfile.style';

const userController = new UserController();


export const UserProfileScreen = () => {

  const route = useRoute();
  const { userId } = route.params as { userId: string };

  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {

    (async () => {
      try {
        const resp = await userController.getUserById(userId);

        if (resp) {
          setUser(resp);
        }

      } catch (error: any) {
        console.log("Error userProfileScreen", error)
        //Alert.alert(`${error?.message}`);

      }
    })()

  }, [userId])


  return (
    <View style= {userProfileStyle.content}>
      <UserInfo user={user} />

    </View>
  
  )
}
