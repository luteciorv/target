import { colors } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { style } from './styles';

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={style.container}
    ></LinearGradient>
  );
}
