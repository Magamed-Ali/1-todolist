import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//yarn add @types/uuid
export  type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
function App() {
    const todoListTitle_1: string = "What to learn";
    //const [filter, setFilter] = useState<FilterValueType>("all")

    let todolistID1 = v1();
    let todolistID2 = v1();
    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "TodolistOne", filter: "all"},
        {id: todolistID2, title: "TodolistTwo", filter: "completed"}
    ])

    const [task_1, setTask_1] = useState({
        [todolistID1] : [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistID2] : [
            {id: v1(), title: "PHP", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "TS", isDone: false}
        ]

    })

    const removeTask = (todolistID: string, taskId: string) => {
        //setTask_1(task_1.filter(item => item.id !== taskId))
        setTask_1({...task_1, [todolistID] : task_1[todolistID].filter(el => el.id !== taskId)})

    }
    const checkboxRemove = (IdIsDone: string, todolistID: string, oppositeIsDone: boolean) => {
        setTask_1({...task_1, [todolistID]: task_1[todolistID].map(el => el.id === IdIsDone ? {...el, isDone: oppositeIsDone} : el)})
    }
    const addDateTask = ( todolistID: string, title:string) => {
        const newTask =  {id: v1(), title: title, isDone: false}
        setTask_1({...task_1, [todolistID] : [...task_1[todolistID], newTask]})
    }
    const changeFilter = (todolistID: string, filter: FilterValueType) => {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: filter} : el))
    }
    const getFilterTasksRender = (tasks: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {
        let filteredTasks: any
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }
//setTask_1(task_1.map(t => t.id === IdIsDone ? {...t, isDone: oppositeIsDone} : t))
    return (
        <div className="App">
            {
                todolist.map(el => {
                    const filtredTasksForRender = getFilterTasksRender(task_1[el.id], el.filter)
                    return (
                        <TodoList
                            key={el.id}
                            Id={el.id}
                            removeTask={removeTask}
                            title={el.title}
                            tasks={filtredTasksForRender}
                            changeFilter={changeFilter}
                            addDateTask={addDateTask}
                            checkboxRemove={checkboxRemove}
                            filter={el.filter}

                        />
                    )
                })
            }

            {/*<TodoList removeTask={removeTask} title={todoListTitle_2} tasks={task_2}/>*/}
        </div>
    );
}

export default App;
