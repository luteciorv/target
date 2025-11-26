import { colors } from '@/theme';
import { Text, View } from 'react-native';
import Input, { CurrencyInputProps } from 'react-native-currency-input';
import { style } from './styles';

type Props = CurrencyInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <Input
        style={style.input}
        placeholderTextColor={colors.gray[400]}
        delimiter='.'
        separator=','
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  );
}
