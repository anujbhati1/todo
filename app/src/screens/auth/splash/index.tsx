import {View, Text, SafeAreaView, Image, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import appImages from '../../../utils/appImages';
import appColors from '../../../utils/appColors';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={appColors.transparent}
        translucent={true}
        barStyle={'light-content'}
      />
      <View>
        <Image source={appImages.splash} style={styles.img} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
