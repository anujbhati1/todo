import {StyleSheet} from 'react-native';
import appColors from '../../../utils/appColors';
import {moderateScale} from 'react-native-size-matters';
import fontSize from '../../../utils/fontSizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  header: {
    backgroundColor: appColors.primary,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  headerTxt: {
    color: appColors.white,
    fontSize: fontSize.regular,
    fontWeight: '600',
  },
  mainView: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(10),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 0.9,
    marginRight: moderateScale(2),
  },
  addTodoBtn: {
    flex: 0.1,
    backgroundColor: appColors.primary,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginLeft: moderateScale(2),
    borderRadius: moderateScale(10),
  },
  addTodoBtnTxt: {
    textAlign: 'center',
    color: appColors.white,
    fontWeight: '600',
  },
  //Render todo Style start
  flatView: {
    backgroundColor: appColors.white,
    elevation: moderateScale(3),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(8),
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(3),
    borderRadius: moderateScale(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoTxt: {
    color: appColors.black,
    fontWeight: '500',
    fontSize: fontSize.medium,
    textAlign: 'justify',
    flex: 1,
  },
  radioBtn: {
    marginHorizontal: moderateScale(3),
  },
  iconView: {
    flexDirection: 'row',
  },
  radioIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  //Render todo Style end
  //List Empty component start
  emptyView: {
    margin: moderateScale(20),
  },
  emptyTxt: {
    textAlign: 'center',
    fontWeight: '500',
    color: appColors.grey,
  },
  //List Empty component end
});
