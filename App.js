import { SafeAreaView, StyleSheet, Button, ScrollView, Text, View, TextInput, Keyboard } from 'react-native';
import HabitCard from './components/HabitCard'; // Importa el componente HabitCard
import { useState, useEffect } from 'react';

export default function App() {
  const [habits, setHabits] = useState([<HabitCard name='Ejemplo' onDelete={handleHabitDeletion} />]);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleHabitDeletion(habit) {
    console.log('Deleting ' + habit);
    const nhabits = habits.map((i) => i.props.name)
    const index = nhabits.indexOf(habit)
    habits.splice(index, 1)
    setHabits(habits)
  }
  
  function handlePress() {
    Keyboard.dismiss()
    const nhabits = habits.map((i) => i.props.name)
    if (nhabits.includes(text)) {
      alert("Ya has ingresado ese hábito.")
    } else if (text === ''){
      alert("Debes ingresar un nombre para tu hábito.")
    } else {
      habits.push(<HabitCard name={text} onDelete={handleHabitDeletion} />)
      setHabits(habits)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Le pasamos el nombre del habito y la funcion que se ejecutara al apretar borrar */}
      <Text style={styles.countertext}>
      Has tenido la app abierta {count} segundos
      </Text>
      <View style={styles.habitsmanagement}>
        <TextInput style={styles.input} onChangeText={setText} value={text} placeholder="Ej: Estudiar" placeholderTextColor='#777c85'/>
        <View>
          <Button onPress={handlePress} title="AGREGAR" />
        </View>
      </View>
      <ScrollView style={styles.habits}>
        {habits}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  habitsmanagement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  countertext: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d5dbe3'
  },
  habits: {
    marginHorizontal: 10
  }
});
