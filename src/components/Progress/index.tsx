import { Text, View } from 'react-native';
import { style } from './styles';

type SavedValue = {
  current: string;
  target: string;
  percentage: number;
};

type Props = {
  data: SavedValue;
};

export function Progress({ data }: Props) {
  return (
    <View style={style.container}>
      <Text style={style.label}>Valor guardado</Text>

      <View style={style.status}>
        <Text style={style.value}>
          {data.current}

          <Text style={style.target}> de {data.target}</Text>
        </Text>

        <Text style={style.percentage}>{data.percentage.toFixed(0)}%</Text>
      </View>

      <View style={style.progress}>
        <View
          style={[style.currentProgress, { width: `${data.percentage}%` }]}
        />
      </View>
    </View>
  );
}
