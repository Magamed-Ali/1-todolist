import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {SuperInpit} from "./components/SuperInpit";
import {TopBar} from "./components/TopBar";
import {Footer} from "./components/Footer";
import {
    addTasksAC,

    changeStatusAC,
    fixedTitleTaskAC,
    removeFilterAC,
    removeTaskTypeAC,
    tasksReducer
} from "./reducer/tasksReducer";
import {addDateTaskListAC, addTodoListAC, todoListDeleteAC, todoListReducer} from "./reducer/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {TodoList} from "./TodoList";


export  type FilterValueType = "all" | "active" | "completed"
export type TodoTasksType = {
    id: string
    title: string
}
export type TasksType = {
    [key: string]:
        {
            data: Array<TaskType1>,
            filter: FilterValueType
        }
}
export type TaskType1 = {
    id: string,
    title: string,
    isDone: boolean
}

function AppWidthRedux() {

    let todoList = useSelector<rootReducerType, Array<TodoTasksType>>(state => state.todoListReducer);
    let task = useSelector<rootReducerType, TasksType>(state => state.tasksReducer);
    const dispatch = useDispatch()

    const AddTodolist = (title: string) => {
        let idTodo = v1();
        dispatch(addTodoListAC(idTodo, title))

    }



    return (
        <>
            <TopBar/>
            <div className="App">
                <SuperInpit inputAddTasks={AddTodolist} />
                {
                    todoList.map(el => {

                        return (
                            <TodoList
                                key={el.id}
                                IDTodolist={el.id}
                                title={el.title}
                            />
                        )
                    })
                }

            </div>
            <Footer/>
        </>

    );
}

export default AppWidthRedux;
