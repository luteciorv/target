import { useSQLiteContext } from 'expo-sqlite';

export type TargetCreate = {
  name: string;
  amount: number;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export function useTargetDatabase() {
  const database = useSQLiteContext();

  async function create(data: TargetCreate): Promise<void> {
    const statement = await database.prepareAsync(
      'INSERT INTO targets (name, amount) VALUES ($name, $amount);'
    );

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }

  async function listBySavedValue(): Promise<TargetResponse[]> {
    return database.getAllAsync<TargetResponse>(`
        SELECT 
            T.id,
            T.name,
            T.amount,
            COALESCE(SUM(TR.amount), 0) AS current,
            COALESCE((SUM(TR.amount) / T.amount) * 100, 0) AS percentage
        FROM targets T
        LEFT JOIN transactions TR ON T.id = TR.target_id
        GROUP BY T.id, T.name, T.amount
        ORDER BY current DESC;
    `);
  }

  return {
    create,
    listBySavedValue,
  };
}
