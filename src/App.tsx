import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//yarn add @types/uuid
export  type FilterValueType = "all" | "active" | "completed"

function App() {
    const todoListTitle_1: string = "What to learn";
    const todoListTitle_2: string = "What to buy";

    const [task_1, setTask_1] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "HTML", isDone: false},
        {id: v1(), title: "JS/TS", isDone: false}])

    const removeTask = (taskId: string) => {
        setTask_1(task_1.filter(item => item.id !== taskId))
    }

    //

    const addDateTask = (title:string) => {
        const newTask =  {id: v1(), title: title, isDone: false}
        setTask_1([...task_1, newTask])
    }
    //

    const [filter, setFilter] = useState<FilterValueType>("all")
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const getFilterTasksRender = (tasks: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {
        let filteredTasks: any
        switch (filter) {
            case "active":
                return tasks.filter(task => task.isDone === false)
            case "completed":
                return tasks.filter(task => task.isDone === true)
            default:
                return tasks

        }

        /* if (filter === "active") {
             return tasks.filter(task => task.isDone === false)
         } else if (filter === "completed") {
             return tasks.filter(task => task.isDone === true)
         }
         return tasks*/
    }

    const filtredTasksForRender = getFilterTasksRender(task_1, filter)
    const task_2: Array<TaskType> = [
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Angular", isDone: false},
        {id: v1(), title: "Vue", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList
                removeTask={removeTask}
                title={todoListTitle_1}
                tasks={filtredTasksForRender}
                changeFilter={changeFilter}
                addDateTask={addDateTask}

            />

            {/*<TodoList removeTask={removeTask} title={todoListTitle_2} tasks={task_2}/>*/}
        </div>
    );
}

export default App;
