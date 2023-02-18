import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {SuperInpit} from "./components/SuperInpit";
import {TopBar} from "./components/TopBar";
import {Footer} from "./components/Footer";


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

    const addDateTask2 = (IDTodolist: string, titleInput: string) => {
        setTodoListTasks(todoListTasks.map(item => item.id === IDTodolist ? {...item, title: titleInput} : item))
    }
    const addTitleTask = (IdTodoList : string, id: string, title: string) => {
        setTask_1({...task_1, [IdTodoList] : {...task_1[IdTodoList], data: [...task_1[IdTodoList].data.map(item => item.id === id ? {...item, title: title} : item)]}})
    }
    const addDateTask = (IDTodolist: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTask_1({...task_1, [IDTodolist] : {...task_1[IDTodolist], data: [...task_1[IDTodolist].data, newTask]} })
    }
    const changeFilter = (IDTodolist: string, filter: FilterValueType) => {
       setTask_1({...task_1, [IDTodolist]: {...task_1[IDTodolist], filter: filter}})

    }
    const changeTaskStatus = (IDTodolist: string, taskId: string, newStatus: boolean) => {

        setTask_1({...task_1, [IDTodolist] : {...task_1[IDTodolist], data: [...task_1[IDTodolist].data.map(el => el.id === taskId ? {...el, isDone: newStatus}  : el)] } })
    }
    const removeTask = (IDTodolist: string, taskId: string) => {
        setTask_1({...task_1, [IDTodolist] : {...task_1[IDTodolist], data: [...task_1[IDTodolist].data.filter(el => el.id !== taskId)] } })
        console.log(task_1)
        /*setTask_1(task_1.filter(item => item.id !== taskId))*/
    }
    const checkboxRemove = (IdIsDone: string, oppositeIsDone: boolean) => {
        /*setTask_1(task_1.map(t => t.id === IdIsDone ? {...t, isDone: oppositeIsDone} : t))*/
    }

    const deleteTodolist = (IdIsDone: string) => {
        setTodoListTasks(todoListTasks.filter(el => el.id !== IdIsDone))
    }

   /* const getFilterTasksRender = (tasks: Array<TaskType>, filter: FilterValueType): Array<TaskType> => {

        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }*/

    const AddTodolist = (titleInput: string) => {
        let idTodo = v1();
        const newDataTask = [{id: v1(), title: "HTML", isDone: true}, {id: v1(), title: "HTML", isDone: false}]
        const newTasks = {id: idTodo, title: titleInput}
        setTodoListTasks([...todoListTasks, newTasks])
        setTask_1({...task_1, [idTodo]: {data: newDataTask, filter: "all"}})

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
