import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { listUsersStyles } from './ListUsers.styles'
import { Avatar, Text } from 'react-native-paper'
import { ENV } from '../../../utils/constanst'

interface ListUserItem {
  _id: string,
  firstname: string,
  lastname: string,
  email: string,
  avatar: string | null
}


interface Iprops {
  user: ListUserItem[]
}

export const ListUsers = ({ user }: Iprops) => {

  const createChat = (user: ListUserItem) => {
    console.log("CREAR CHAT CON====>", user)
  }


  return (
    <ScrollView style={listUsersStyles.content}>
      {user.map(item => (
        <TouchableOpacity
          key={item._id}
          style={listUsersStyles.item}
          onPress={() => createChat(item)}
        >
          {item?.avatar ? (
            <Avatar.Image size={40} source={{ uri: `${ENV.BASE_PATH}/${item.avatar}` }} style={listUsersStyles.avatar} />
          ) : (
            <Avatar.Text size={40} label={item.email.substring(0, 2).toUpperCase()} style={listUsersStyles.avatar} />
          )}

          <View style= {{flexDirection: 'column'}}>
            <Text style={listUsersStyles.name}>
              {item?.firstname || item.lastname ? `${item.firstname || ''} ${item.lastname || ''}` : `...`}
            </Text>

            <Text style={listUsersStyles.email}>
              {item?.email || ''}
            </Text>
          </View>



        </TouchableOpacity>
      ))}

    </ScrollView>
  )
}
