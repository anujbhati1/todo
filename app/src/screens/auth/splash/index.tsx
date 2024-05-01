import {View, SafeAreaView, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import appImages from '../../../utils/appImages';
import appColors from '../../../utils/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}: any) => {
  const getUserIdFromLocal = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      navigation.replace('Home');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    setTimeout(getUserIdFromLocal, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={appColors.primary}
        barStyle={'light-content'}
      />
      <View>
        <Image source={appImages.splash} style={styles.img} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
