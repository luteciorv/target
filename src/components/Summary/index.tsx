import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue, Text, View } from 'react-native';
import { style } from './styles';

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isRight?: boolean;
};

export function Summary({ data, icon, isRight = false }: Props) {
  return (
    <View style={style.container}>
      <View style={[style.header, isRight && { justifyContent: 'flex-end' }]}>
        <MaterialIcons name={icon.name} size={16} color={icon.color} />
        <Text style={style.label}>{data.label}</Text>
      </View>

      <Text style={style.value}>{data.value}</Text>
    </View>
  );
}
