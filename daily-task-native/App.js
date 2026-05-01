import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function App(){
  const [text,setText]=useState('');
  const [tasks,setTasks]=useState([]);

  useEffect(()=>{load();Notifications.requestPermissionsAsync();},[]);

  const load=async()=>{
    const data=await AsyncStorage.getItem('tasks');
    if(data)setTasks(JSON.parse(data));
  }

  const save=async(newTasks)=>{
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks',JSON.stringify(newTasks));
  }

  const categorize=(t)=>{
    t=t.toLowerCase();
    if(t.includes('call'))return 'Calls';
    if(t.includes('truck'))return 'Truck';
    if(t.includes('bill'))return 'Bills';
    return 'Personal';
  }

  const addTask=async()=>{
    if(!text)return;
    const category=categorize(text);
    const task={id:Date.now().toString(),text,category};
    const newTasks=[...tasks,task];
    save(newTasks);

    await Notifications.scheduleNotificationAsync({
      content:{title:'Reminder',body:text},
      trigger:{seconds:60}
    });

    setText('');
  }

  return(
    <View style={{padding:40}}>
      <Text style={{fontSize:28,fontWeight:'bold'}}>Task Assistant</Text>
      <TextInput
        placeholder="Speak or type task"
        value={text}
        onChangeText={setText}
        style={{borderWidth:1,padding:10,marginTop:20}}
      />
      <Button title="Save Task" onPress={addTask}/>

      <FlatList
        data={tasks}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <Text style={{marginTop:10}}>{item.text} ({item.category})</Text>
        )}
      />
    </View>
  );
}
