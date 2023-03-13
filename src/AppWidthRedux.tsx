import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from "./TodoList";
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
    let TodoListID1 = v1();
    let TodolistID2 = v1();
    let TodolistID3 = v1();


    let todoList = useSelector<rootReducerType, Array<TodoTasksType>>(state => state.todoListReducer);
    let task = useSelector<rootReducerType, TasksType>(state => state.tasksReducer);

    const dispatch = useDispatch()

    const addTitleTask = (IdTodoList : string, id: string, title: string) => {
        dispatch(fixedTitleTaskAC(IdTodoList, id, title))
    }
    const addDateTask = (IDTodolist: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        dispatch(addTasksAC(IDTodolist, title, newTask))
    }
    const changeTaskStatus = (IDTodolist: string, taskId: string, newStatus: boolean) => {
        dispatch(changeStatusAC(IDTodolist, taskId, newStatus))
    }
    const changeFilter = (IDTodolist: string, filter: FilterValueType) => {
        dispatch(removeFilterAC(IDTodolist, filter))
    }
    const removeTask = (IDTodolist: string, taskId: string) => {
        dispatch(removeTaskTypeAC(IDTodolist, taskId))
    }

    /////-----------------------------------------------
    const addDateTask2 = (IDTodolist: string, titleInput: string) => {
        dispatch(addDateTaskListAC(IDTodolist, titleInput))
    }
    const deleteTodolist = (IdIsDone: string) => {
        dispatch(todoListDeleteAC(IdIsDone))
        delete task[IdIsDone]
    }
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

                        /*const filtredTasksForRender = getFilterTasksRender(task_1[el.id].data, task_1[el.id].filter);*/
                        let filtredTasksForRender = task[el.id].data
                        if(task[el.id].filter === "active"){
                            filtredTasksForRender = task[el.id].data.filter((el)=>!el.isDone)
                        }
                        if(task[el.id].filter === "completed"){
                            filtredTasksForRender = task[el.id].data.filter(el => el.isDone)
                        }

                        return (
                            <TodoList
                                key={el.id}
                                IDTodolist={el.id}
                                removeTask={removeTask}
                                title={el.title}
                                tasks={filtredTasksForRender}
                                changeFilter={changeFilter}
                                addDateTask={addDateTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={task[el.id].filter}
                                deleteTodolist={deleteTodolist}
                                addTitleTask={addTitleTask}
                                addDateTask2={addDateTask2}
                            />
                        )
                    })
                }

                {/*<TodoList removeTask={removeTask} title={todoListTitle_2} tasks={task_2}/>*/}
            </div>
            <Footer/>
        </>

    );
}

export default AppWidthRedux;
