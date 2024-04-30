import {StyleSheet} from 'react-native';
import appColors from '../../../utils/appColors';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  forgotBtn: {
    marginTop: moderateScale(20),
  },
  forgotBtnTxt: {
    color: appColors.primary,
    fontWeight: '500',
    textAlign: 'right',
  },
  scrollContainer: {
    paddingHorizontal: moderateScale(20),
  },
});
