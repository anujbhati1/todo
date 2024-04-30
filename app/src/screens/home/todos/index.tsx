import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import appColors from '../../../utils/appColors';
import InputBox from '../../../components/InputBox';
import appIcons from '../../../utils/appIcons';

const Todos = () => {
  const [todoList, setTodoList] = useState<any>([]);
  const [todoTxt, setTodoTxt] = useState('');
  const [updateTodo, setUpdateTodo] = useState(null);

  const deleteTodo = (id: number) => {
    const res = todoList.filter((item: any) => item.id !== id);
    setTodoList(res);
  };

  const editTodoFunc = () => {
    const res = todoList.map((item: any) => {
      //@ts-ignore
      if (item.id == updateTodo?.id) {
        return {...item, todo: todoTxt};
      } else {
        return item;
      }
    });
    setTodoList(res);
    setTodoTxt('');
    setUpdateTodo(null);
  };

  const addTodo = () => {
    if (todoTxt !== '') {
      if (updateTodo) {
        editTodoFunc();
      } else {
        const newTodo = {
          id: Math.random(),
          isDone: false,
          todo: todoTxt,
        };
        setTodoList((pre: any) => [...pre, newTodo]);
        setTodoTxt('');
      }
    }
  };

  const setDoneTodo = (id: number) => {
    const res = todoList.map((item: any) => {
      if (item.id == id) {
        return {...item, isDone: !item.isDone};
      } else {
        return item;
      }
    });
    setTodoList(res);
  };

  const RenderTodos = ({item}: any) => {
    return (
      <View style={styles.flatView}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setDoneTodo(item.id);
          }}
          style={styles.radioBtn}>
          <Image
            style={styles.radioIcon}
            source={item.isDone ? appIcons.completed : appIcons.pending}
          />
        </TouchableOpacity>
        <Text
          style={
            item.isDone
              ? {
                  ...styles.todoTxt,
                  textDecorationLine: 'line-through',
                  color: appColors.grey,
                }
              : styles.todoTxt
          }>
          {item.todo}
        </Text>
        <View style={styles.iconView}>
          <TouchableOpacity
            disabled={item.isDone}
            activeOpacity={0.7}
            onPress={() => {
              setTodoTxt(item.todo);
              setUpdateTodo(item);
            }}
            style={styles.radioBtn}>
            <Image style={styles.radioIcon} source={appIcons.edit} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              deleteTodo(item.id);
            }}
            style={styles.radioBtn}>
            <Image style={styles.radioIcon} source={appIcons.delete} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyCompo = () => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyTxt}>No Todos.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={appColors.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Your Todos</Text>
      </View>
      <View style={styles.mainView}>
        <View style={styles.rowView}>
          <View style={styles.textBox}>
            <InputBox
              onChangeText={(txt: string) => setTodoTxt(txt)}
              placeholder="Enter todo..."
              value={todoTxt}
            />
          </View>
          <TouchableOpacity
            onPress={addTodo}
            activeOpacity={0.8}
            style={styles.addTodoBtn}>
            <Text style={styles.addTodoBtnTxt}>
              {updateTodo ? 'Edit' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          data={todoList}
          renderItem={RenderTodos}
          ListEmptyComponent={renderEmptyCompo}
        />
      </View>
    </SafeAreaView>
  );
};

export default Todos;
