import {SafeAreaView, StatusBar, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import appColors from '../../../utils/appColors';
import InputBox from '../../../components/InputBox';
import AuthHeader from '../../../components/AuthHeader';
import CustomBtn from '../../../components/CustomBtn';
import Spacer from '../../../utils/spacer';
import RowTxtBtn from '../../../components/RowTxtBtn';

const Signup = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={appColors.white} barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <Spacer height={15} />
        <AuthHeader
          title={`Create your new ${'\n'}account.`}
          desc="Create an account to start adding your todos"
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
          placeholder="Enter User Name"
          title="User Name"
          value=""
        />
        <Spacer height={15} />
        <InputBox
          onChangeText={() => {}}
          placeholder="Enter Password"
          title="Password"
          value=""
          isPassword
        />
        <Spacer height={30} />
        <CustomBtn onPress={() => {}} title="Register" />
        <Spacer height={20} />
        <RowTxtBtn
          title="Have an account?"
          btnTxt="Sign In"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Spacer height={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
