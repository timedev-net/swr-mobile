import { StyleSheet } from 'react-native'
import { theme_default, theme_dark } from '../../theme'

const styles = StyleSheet.create({
  colorDrawer: { backgroundColor: theme_dark.colors.drawer},
  colorText: { color: theme_dark.colors.text},
  cabecalho: { flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", justifyContent: 'center', paddingBottom: 12, paddingTop: 5, backgroundColor: theme_dark.colors.background },
  image: { width: 60, height: 70 },
  text1: { color: theme_dark.colors.text, fontSize: 60, fontWeight: 'bold', paddingLeft: 20},
  text2: { color: theme_dark.colors.text, fontSize: 14, paddingTop: 8},
})

export default styles;