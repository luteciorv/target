import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Olá, Expo Router</Text>
      <Button title='Nova meta' onPress={() => router.navigate('/target')} />
      <Button
        title='Transação'
        onPress={() => router.navigate('/transaction/132')}
      />
      <Button
        title='Em progresso'
        onPress={() => router.navigate('/in-progress/12')}
      />
    </View>
  );
}
