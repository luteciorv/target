import { colors } from '@/theme';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { style } from './styles';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <TextInput
        style={style.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
}
