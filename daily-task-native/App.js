import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    load();
    Notifications.requestPermissionsAsync();
  }, []);

  const load = async () => {
    const data = await AsyncStorage.getItem('tasks');
    if (data) setTasks(JSON.parse(data));
  };

  const save = async (newTasks) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const categorize = (t) => {
    t = t.toLowerCase();
    if (t.includes('call') || t.includes('lawyer')) return 'Legal';
    if (t.includes('truck') || t.includes('oil')) return 'Truck';
    if (t.includes('bill') || t.includes('pay')) return 'Bills';
    if (t.includes('doctor')) return 'Health';
    return 'Personal';
  };

  const getDelay = (t) => {
    if (t.includes('morning')) return 60 * 60 * 12;
    if (t.includes('afternoon')) return 60 * 60 * 6;
    return 60 * 60 * 2;
  };

  const addTask = async () => {
    if (!text) return;

    const category = categorize(text);
    const delay = getDelay(text);

    const task = {
      id: Date.now().toString(),
      text,
      category,
      done: false
    };

    const newTasks = [...tasks, task];
    save(newTasks);

    // primary reminder
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Reminder', body: text },
      trigger: { seconds: delay }
    });

    // follow-up check
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Check-in', body: 'Did you finish: ' + text },
      trigger: { seconds: delay + 3600 }
    });

    setText('');
  };

  return (
    <View style={{ padding: 30 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Task Assistant</Text>

      <TextInput
        placeholder="Tap mic on keyboard and speak your task"
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 12, marginTop: 20, borderRadius: 10 }}
      />

      <TouchableOpacity onPress={addTask} style={{ backgroundColor: '#2563eb', padding: 14, marginTop: 15, borderRadius: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Save Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 12, fontSize: 16 }}>
            {item.text} ({item.category})
          </Text>
        )}
      />
    </View>
  );
}
