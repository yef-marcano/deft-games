import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from "../../constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 0,
      },
      scrollView: {
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.padding,
      },
      categoryContainer: {
        marginTop: SIZES.padding,
      },
});