import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { useTargetDatabase } from '@/database/useTargetDatabase';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function Target() {
  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert(
        'Atenção',
        'Preencha o nome e o valor maior do que zero.'
      );
    }

    setIsProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  async function update() {
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount,
      });
      Alert.alert('Sucesso', 'Meta atualizada com sucesso.', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a meta.');
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });

      Alert.alert('Nova meta', 'Meta criada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta.');
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da meta.');
      console.log(error);
    }
  }

  async function handleRemove() {
    if (!params.id) return;

    Alert.alert('Remover', 'Deseja realmente remover?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: remove,
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }

  async function remove() {
    try {
      setIsProcessing(true);
      await targetDatabase.remove(Number(params.id));
      Alert.alert('Meta', 'Meta removida com sucesso.', [
        {
          text: 'Ok',
          onPress: () => router.replace('/'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a meta.');
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title='Meta'
        subtitle='Economiza para alcançar sua meta financeira.'
        rightButton={
          params.id ? { icon: 'delete', onPress: handleRemove } : undefined
        }
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label='Nome da meta'
          placeholder='Ex: Viagem para praia, Apple Watch'
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label='Valor alvo (R$)'
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title='Salvar'
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
