import {
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './styles';
import appColors from '../../../utils/appColors';
import InputBox from '../../../components/InputBox';
import AuthHeader from '../../../components/AuthHeader';
import CustomBtn from '../../../components/CustomBtn';
import Spacer from '../../../utils/spacer';
import RowTxtBtn from '../../../components/RowTxtBtn';

const Login = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={appColors.white} barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <Spacer height={15} />
        <AuthHeader
          title={`Login to your ${'\n'}account.`}
          desc="Please sign in to your account"
        />
        <Spacer height={30} />
        <InputBox
          onChangeText={() => {}}
          placeholder="Enter Email"
          title="Email Address"
          value=""
        />
        <Spacer height={15} />
        <InputBox
          onChangeText={() => {}}
          placeholder="Password"
          title="Password"
          value=""
          isPassword
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.forgotBtn}>
          <Text style={styles.forgotBtnTxt}>Forgot Password?</Text>
        </TouchableOpacity>
        <Spacer height={20} />
        <CustomBtn
          onPress={() => {
            navigation.replace('Home');
          }}
          title="Sign In"
        />
        <Spacer height={20} />
        <RowTxtBtn
          title="Don't have an account?"
          btnTxt="Register"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
        <Spacer height={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
