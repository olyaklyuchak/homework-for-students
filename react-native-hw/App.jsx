/*
Динамічне отримання та відображення списку завдань:
Напишіть код прямо у Expo Snack (https://snack.expo.dev/) 
та після перевірки вставте результат у ваш поточний файл.

Вимоги:
- Використати React Native компоненти:
    - TextInput для введення числа — кількості завдань для запиту;
    - Button для виконання запиту;
    - FlatList для відображення списку завдань.
- Керувати станом за допомогою useState та useEffect:
    - tasks — масив отриманих завдань;
    - error — для обробки помилок.
    - loading — для індикації завантаження;
- При натисканні кнопки робити запит на API https://jsonplaceholder.typicode.com/todos?_limit=<число з TextInput> та оновлювати список tasks.
  Приклад запиту: якщо у TextInput введено 5, URL буде https://jsonplaceholder.typicode.com/todos?_limit=5
- Відобразити:
    - повідомлення про завантаження, коли loading === true;
    - повідомлення про помилку, якщо error не порожній;
    - список завдань через FlatList, показуючи title кожного елемента.
*/
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet 
} from "react-native";

export default function App() {
  const [limit, setLimit] = useState("");      // значення з TextInput
  const [tasks, setTasks] = useState([]);      // масив завдань
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const fetchTasks = () => {
    if (!limit || isNaN(limit) || Number(limit) <= 0) {
      setError("Введіть коректне число");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error("Помилка при запиті до API");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Homework</Text>

      <TextInput
        style={styles.input}
        placeholder="Введіть кількість завдань"
        keyboardType="numeric"
        value={limit}
        onChangeText={setLimit}
      />

      <Button title="Завантажити завдання" onPress={fetchTasks} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        style={{ width: "100%", marginTop: 20 }}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>• {item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 18,
  },
  item: {
    fontSize: 18,
    marginVertical: 6,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  error: {
    color: "red",
    marginTop: 15,
    fontSize: 18,
    textAlign: "center",
  },
});
