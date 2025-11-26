import { colors } from '@/theme';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { style } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
};

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...rest}
    >
      <Text style={style.title}>
        {isProcessing ? (
          <ActivityIndicator size='small' color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
