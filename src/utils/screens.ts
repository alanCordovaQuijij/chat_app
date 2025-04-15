const auth = {
  authStartScreen: 'AuthStartScreen',
  loginScreen: 'LoginScreen',
  registerScreen: 'RegisterScreen0',
};

const globals = {
  userProfileScreen: 'UserProfileScreen',
  cameraScreen: 'CameraScreen',
  imageFullScreen: 'ImageFullScreen',
  chatScreen: 'ChatScreen',
  groupScreen: 'GroupScreen',
  groupProfileScreen: 'GroupProfileScreen',
  addUserGroupScreen: 'AddUserGroupScreen',
  changeNameGroupScreen: 'ChangeNameGroupScreen',
};

const chats = {
  root: 'ChatsRoot',
  chatsScreen: 'ChatsScreen',
  createChatScreen: 'CreateChatScreen',
};

const groups = {
  root: 'GroupsRoot',
  groupsScreen: 'GroupsScreen',
  createGroupScreen: 'CreateGroupScreen',
};

const settings = {
  root: 'SettingsRoot',
  settingScreen: 'SettingScreen',
  changeFirstNameScreen: 'ChangeFirstNameScreen',
  changeLastNameScreen: 'ChangeLastNameScreen',
};

export const screens = {
  auth,
  globals,
  tab: {
    root: 'BottomTabRoot',
    chats,
    groups,
    settings,
  },
};
