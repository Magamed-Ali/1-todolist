import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export  type FilterValueType = "all" | "active" | "completed"
export type TodoTasksType = {
    id: string
    title: string
}

type TasksType = {
    [key: string]:
        {
            data: Array<TaskType1>,
            filter: FilterValueType
        }
}

type TaskType1 = {
    id: string,
    title: string,
    isDone: boolean
}

function App() {
    let TodoListID1 = v1();
    let TodolistID2 = v1();

    const [todoListTasks, setTodoListTasks] = useState<Array<TodoTasksType>>([
        {id: TodoListID1, title: "What to learn"},
        {id: TodolistID2, title: "What to buy"}
    ])
    const [task_1, setTask_1] = useState<TasksType>({
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
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "JS/TS", isDone: false},
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "JS/TS", isDone: false}
            ],
            filter: "completed"
        }
    })

    const addDateTask = (IDTodolist: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTask_1({...task_1, [IDTodolist] : {...task_1[IDTodolist], data: [...task_1[IDTodolist].data, newTask]} })
    }
    const changeFilter = (IDTodolist: string, filter: FilterValueType) => {
       setTask_1({...task_1, [IDTodolist]: {...task_1[IDTodolist], filter: filter}})
    }
    const changeTaskStatus = (IDTodolist: string, taskId: string, newStatus: boolean) => {

        setTask_1({...task_1, [IDTodolist] : {...task_1[IDTodolist], data: [...task_1[IDTodolist].data.map(el => el.id === taskId ? {...el, isDone: newStatus} : el)] } })
    }
    const removeTask = (IDTodolist: string, taskId: string) => {
        setTask_1({...task_1, [IDTodolist] : {...task_1[IDTodolist], data: [...task_1[IDTodolist].data.filter(el => el.id !== taskId)] } })
        /*setTask_1(task_1.filter(item => item.id !== taskId))*/
    }
    const checkboxRemove = (IdIsDone: string, oppositeIsDone: boolean) => {
        /*setTask_1(task_1.map(t => t.id === IdIsDone ? {...t, isDone: oppositeIsDone} : t))*/
    }


    const getFilterTasksRender = (tasks: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {

        switch (filter) {
            case "active":
                return tasks.filter(task => task.isDone === false)
            case "completed":
                return tasks.filter(task => task.isDone === true)
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            {
                todoListTasks.map(el => {

                    /*let filteredTasks = task_1[el.id].data*/
                    const filtredTasksForRender = getFilterTasksRender(task_1[el.id].data, task_1[el.id].filter);

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
                        />
                    )
                })
            }

            {/*<TodoList removeTask={removeTask} title={todoListTitle_2} tasks={task_2}/>*/}
        </div>
    );
}

export default App;
