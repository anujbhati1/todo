import {StyleSheet} from 'react-native';
import appColors from '../../../utils/appColors';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  scrollContainer: {
    paddingHorizontal: moderateScale(20),
  },
});
