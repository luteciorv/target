import { colors } from '@/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue, Pressable, PressableProps, Text } from 'react-native';
import { style } from './styles';

type Props = PressableProps & {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export function Option({
  isSelected,
  title,
  icon,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      style={[style.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />

      <Text style={[style.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
