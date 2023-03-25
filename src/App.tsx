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
function App() {
    let TodoListID1 = v1();
    let TodolistID2 = v1();
    let TodolistID3 = v1();

    const [todoListTasks, todoListDispatch] = useReducer(todoListReducer, [
        {id: TodoListID1, title: "What to learn"},
        {id: TodolistID2, title: "What to buy"}
    ])

    const [task_1, tasksDispatch] = useReducer(tasksReducer, {
        [TodoListID1]: {
            data: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "JS/TS", isDone: false},
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        [TodolistID2]: {
            data: [
                {id: v1(), title: "HTML11", isDone: true},
                {id: v1(), title: "HTML22", isDone: true},
                {id: v1(), title: "JS/TS22", isDone: false},
                {id: v1(), title: "HTML22", isDone: true},
                {id: v1(), title: "HTML22", isDone: false},
                {id: v1(), title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    })

    const addTitleTask = (IdTodoList : string, id: string, title: string) => {
        tasksDispatch(fixedTitleTaskAC(IdTodoList, id, title))
    }
    const addDateTask = (IDTodolist: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        tasksDispatch(addTasksAC(IDTodolist, title, newTask))
    }
    const changeTaskStatus = (IDTodolist: string, taskId: string, newStatus: boolean) => {
        tasksDispatch(changeStatusAC(IDTodolist, taskId, newStatus))
    }
    const changeFilter = (IDTodolist: string, filter: FilterValueType) => {
        tasksDispatch(removeFilterAC(IDTodolist, filter))
    }
    const removeTask = (IDTodolist: string, taskId: string) => {
        tasksDispatch(removeTaskTypeAC(IDTodolist, taskId))
    }

    /////-----------------------------------------------
    const addDateTask2 = (IDTodolist: string, titleInput: string) => {
        todoListDispatch(addDateTaskListAC(IDTodolist, titleInput))
    }
    const deleteTodolist = (IdIsDone: string) => {
        todoListDispatch(todoListDeleteAC(IdIsDone))
        delete task_1[IdIsDone]
    }
    const AddTodolist = (title: string) => {
        let idTodo = v1();

        todoListDispatch(addTodoListAC(idTodo, title))
        tasksDispatch(addTodoListAC(idTodo, title))
    }



    return (
        <>
            <TopBar/>
            <div className="App">
                <SuperInpit inputAddTasks={AddTodolist} />
                {
                    todoListTasks.map(el => {

                        /*const filtredTasksForRender = getFilterTasksRender(task_1[el.id].data, task_1[el.id].filter);*/
                        let filtredTasksForRender = task_1[el.id].data
                        if(task_1[el.id].filter === "active"){
                            filtredTasksForRender = task_1[el.id].data.filter((el)=>!el.isDone)
                        }
                        if(task_1[el.id].filter === "completed"){
                            filtredTasksForRender = task_1[el.id].data.filter(el => el.isDone)
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
                                filter={task_1[el.id].filter}
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

export default App;
