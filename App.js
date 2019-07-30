/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput, 
  TouchableOpacity
} from 'react-native';

import { 
  ListItem, 
  CheckBox, 
} from 'react-native-elements'

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [todos, setTodos] = useState(useInitialTodos);
  const [newTodo, setNewTodo] = useState();

  const onChange = useHandleChange(setNewTodo);
  const onSubmit = useHandleSubmit(newTodo, setNewTodo, todos, setTodos);
  const onToggle = useHandleToggle(todos, setTodos);
  const onRemove = useHandleRemove(todos, setTodos);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          
          <View style={styles.body}>
            <View style={styles.addTodo}>
              <TextInput 
                style={styles.input}
                placeholder='Add Todo'
                onChangeText={(text) => onChange(text)}
                value={newTodo}
              />
              <TouchableOpacity onPress={e => onSubmit(e)}>
                <Icon name="plus-circle" size={30} color={Colors.light} />
              </TouchableOpacity>
            </View>
            {todos.map(todo => (
              <View key={todo.text} style={styles.list}>
                <CheckBox 
                  checked={todo.done}
                  onIconPress={() => onToggle(todo)}
                  style={styles.checkBox}
                />
                <ListItem 
                  title={todo.text}
                  style={todo.done ? styles.listItemDone : styles.listItem} 
                />
                <TouchableOpacity onPress={() => onRemove(todo)}>
                  <Icon name="minus-square" size={20} color={Colors.light} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    padding: 5
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  input: {
    width: 350,
    marginLeft: 10,
    padding: 10
  },
  addTodo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  listItem: {
    width: 300
  },
  listItemDone: {
    width: 300,
  },

});

function useInitialTodos() {
  const initialTodos = [
    { text: "Learn JavaScript", done: false },
    { text: "Learn React", done: false },
    { text: "Play around in JSFiddle", done: true },
    { text: "Build something awesome", done: true }
  ];
  return initialTodos;
}

function useHandleChange(setNewTodo) {
  function handleChange(text) {
    setNewTodo(text);
  }
  return handleChange
}

function useHandleSubmit(newTodo, setNewTodo, todos, setTodos) {
  function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      text: newTodo,
      done: false
    }
    if (!newTodo) return;
    setTodos([...todos, todo]);
    setNewTodo('');
  }
  return handleSubmit;
}

function useHandleToggle(todos, setTodos) {
  function handleToggleTodo(todo) {
    const index = todos.indexOf(todo);
    todos[index].done = !todos[index].done;
    setTodos([...todos]);
  }
  return handleToggleTodo;
}

function useHandleRemove(todos, setTodos) {
  function handleRemoveTodo(todo) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    setTodos([...todos]);
  }
  return handleRemoveTodo;
}
