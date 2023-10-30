import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },

  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
  },

  settingName: {
    width: '80%',
  },

  margRight: {marginRight: 24},

  wrapper: {
    flex: 1,
    width: '96%',
    justifyContent: 'center',
  },

  subheader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'grey',
  },

  settingWrapper: {
    marginVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 6,
  },

  text: {
    color: 'white',
  },

  btn: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 30,
    backgroundColor: 'coral',
  },
});
