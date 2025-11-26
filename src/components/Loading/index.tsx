import { colors } from '@/theme/colors';
import { ActivityIndicator } from 'react-native';
import { style } from './styles';

export function Loading() {
  return <ActivityIndicator color={colors.blue[500]} style={style.conainer} />;
}
