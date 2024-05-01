import {SafeAreaView, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import appColors from '../../../utils/appColors';
import InputBox from '../../../components/InputBox';
import AuthHeader from '../../../components/AuthHeader';
import CustomBtn from '../../../components/CustomBtn';
import Spacer from '../../../utils/spacer';
import RowTxtBtn from '../../../components/RowTxtBtn';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  SignupValidator,
  SignupValidatorType,
} from '../../../lib/signupValidators';
import {useForm} from 'react-hook-form';
import Http from '../../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getError} from '../../../utils/getErrMsg';
import {ToastMessage} from '../../../utils/toast';

const Signup = ({navigation}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {handleSubmit, control} = useForm<SignupValidatorType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(SignupValidator),
  });

  const handleSignup = async ({name, email, password}: SignupValidatorType) => {
    try {
      setLoading(true);
      const {data} = await Http.post('/api/signup', {name, email, password});
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
          title={`Create your new ${'\n'}account.`}
          desc="Create an account to start adding your todos"
        />
        <Spacer height={30} />
        <InputBox
          name="name"
          control={control}
          placeholder="Enter User Name"
          title="User Name"
        />
        <Spacer height={15} />
        <InputBox
          name="email"
          control={control}
          placeholder="Enter Email"
          title="Email Address"
        />
        <Spacer height={15} />
        <InputBox
          name="password"
          control={control}
          placeholder="Enter Password"
          title="Password"
          isPassword
        />
        <Spacer height={30} />
        <CustomBtn
          disabled={loading}
          onPress={handleSubmit(handleSignup)}
          title={loading ? 'Registering...' : 'Register'}
        />
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
