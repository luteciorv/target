import { colors } from '@/theme';
import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Separator } from '../Separator';
import { style } from './styles';

type Props<T> = FlatListProps<T> & {
  title: string;
  emptyMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...rest
}: Props<T>) {
  return (
    <View style={[style.container, containerStyle]}>
      <Text style={style.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.listContent}
        ListEmptyComponent={() => (
          <Text style={style.empty}>{emptyMessage}</Text>
        )}
        {...rest}
      />
    </View>
  );
}
