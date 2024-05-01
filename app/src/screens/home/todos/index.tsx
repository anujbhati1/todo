import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import appColors from '../../../utils/appColors';
import appIcons from '../../../utils/appIcons';
import Http from '../../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getError} from '../../../utils/getErrMsg';
import {ToastMessage} from '../../../utils/toast';
import TodoInputBox from '../../../components/TodoInputBox';

interface TodoListProps {
  id: string;
  todo: string;
  isDone: string;
  userId: string;
}

const Todos = ({navigation}: any) => {
  const [todoList, setTodoList] = useState<TodoListProps[]>([]);
  const [todoTxt, setTodoTxt] = useState<string>('');
  const [updateTodo, setUpdateTodo] = useState<null | TodoListProps>(null);

  const getAllTodos = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const {data} = await Http.get(`/api/todos/${userId}`);
      setTodoList(data.data);
    } catch (error: any) {
      ToastMessage(getError(error));
    }
  };

  const addTodo = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const {data} = await Http.post(`/api/todos`, {
        todo: todoTxt,
        userId,
      });
      setTodoList((pre: any) => [data.data, ...pre]);
      setTodoTxt('');
    } catch (error: any) {
      ToastMessage(getError(error));
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const {data} = await Http.delete(`/api/todos/${todoId}`);
      const res = todoList.filter((item: any) => item.id !== data.data.id);
      setTodoList(res);
    } catch (error: any) {
      ToastMessage(getError(error));
    }
  };

  const editTodoFunc = async (todoId: string) => {
    try {
      const {data} = await Http.patch(`/api/todos/${todoId}`, {todo: todoTxt});
      const res = todoList.map((item: any) => {
        if (item.id === data.data.id) {
          return data.data;
        } else {
          return item;
        }
      });
      setTodoList(res);
      setTodoTxt('');
      setUpdateTodo(null);
    } catch (error: any) {
      ToastMessage(getError(error));
    }
  };

  const setDoneTodo = async (todoId: string, isDone: boolean) => {
    try {
      const {data} = await Http.patch(`/api/todos/${todoId}`, {isDone});
      const res = todoList.map((item: any) => {
        if (item.id === data.data.id) {
          return data.data;
        } else {
          return item;
        }
      });
      setTodoList(res);
    } catch (error: any) {
      ToastMessage(getError(error));
    }
  };

  const RenderTodos = ({item}: any) => {
    return (
      <View style={styles.flatView}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setDoneTodo(item.id, !item.isDone);
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
        <Text style={styles.emptyTxt}>No todos please add...</Text>
      </View>
    );
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={appColors.primary}
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Your Todos</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            AsyncStorage.removeItem('userId');
            navigation.replace('Auth');
          }}>
          <Image source={appIcons.logout} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <View style={styles.rowView}>
          <View style={styles.textBox}>
            <TodoInputBox
              onChangeText={(txt: string) => setTodoTxt(txt)}
              placeholder="Enter todo..."
              value={todoTxt}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (todoTxt == '') {
                ToastMessage('Enter todo...');
                return;
              }
              if (updateTodo) {
                editTodoFunc(updateTodo?.id);
                return;
              }
              addTodo();
            }}
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
