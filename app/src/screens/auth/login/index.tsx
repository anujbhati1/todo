import {
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import appColors from '../../../utils/appColors';
import InputBox from '../../../components/InputBox';
import AuthHeader from '../../../components/AuthHeader';
import CustomBtn from '../../../components/CustomBtn';
import Spacer from '../../../utils/spacer';
import RowTxtBtn from '../../../components/RowTxtBtn';
import {useForm} from 'react-hook-form';
import {LoginValidator, LoginValidatorType} from '../../../lib/loginValidators';
import {zodResolver} from '@hookform/resolvers/zod';
import Http from '../../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../../utils/toast';
import {getError} from '../../../utils/getErrMsg';

const Login = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {handleSubmit, control} = useForm<LoginValidatorType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginValidator),
  });

  const handleLogin = async ({email, password}: LoginValidatorType) => {
    try {
      setLoading(true);
      const {data} = await Http.post('/api/login', {email, password});
      AsyncStorage.setItem('userId', data.data.id);
      setLoading(false);
      navigation.replace('Home');
    } catch (error: any) {
      setLoading(false);
      ToastMessage(getError(error));
    }
  };

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
          placeholder="Enter Email"
          title="Email Address"
          control={control}
          name="email"
        />
        <Spacer height={15} />
        <InputBox
          control={control}
          name="password"
          placeholder="Password"
          title="Password"
          isPassword
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.forgotBtn}>
          <Text style={styles.forgotBtnTxt}>Forgot Password?</Text>
        </TouchableOpacity>
        <Spacer height={20} />
        <CustomBtn
          disabled={loading}
          onPress={handleSubmit(handleLogin)}
          title={loading ? 'Signing In...' : 'Sign In'}
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
