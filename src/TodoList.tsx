
import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useRef, useState} from 'react';

import {FilterValueType} from "./App";

type TodoListPropsType = {
    IDTodolist: string
    title: string,
    filter: FilterValueType,
    tasks: Array<TaskType>
    removeTask: (IDTodolist: string, taskId: string) => void
    changeFilter: (IDTodolist: string, filter: FilterValueType) => void
    addDateTask: (IDTodolist: string, item: string) => void
    deleteTodolist: (IdIsDone: string) => void
    changeTaskStatus: (IDTodolist: string, id: string, status: boolean) => void

}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const [titleInput, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

/// Ref for input
   /* const ref = useRef<HTMLInputElement>(null)*/
////

    // let tasksList;
    // if(props.tasks.length === 0){
    //     tasksList = <span>Your taskslist is empty</span>
    // } else {
    //     tasksList = props.tasks.map((task:TaskType) => {
    //         return (
    //             <li>
    //                 <input type="checkbox" checked={task.isDone}/>
    //                 <span>{task.title}</span>
    //             </li>
    //         )
    //     })
    // }

    let removeTask = props.removeTask

    let tasksList = props.tasks.length
        ? props.tasks.map((task:TaskType) => {
            const changeStatusEvent = (e: ChangeEvent<HTMLInputElement>)=> props.changeTaskStatus(props.IDTodolist, task.id, e.currentTarget.checked )
            return (
                <li key={task.id}>

                    <input type="checkbox" checked={task.isDone} onChange={changeStatusEvent}/>
                    <span className={task.isDone ? "task-done" : "task-doneOf"}>{task.title}</span>

                    <button onClick={() => removeTask(props.IDTodolist, task.id)}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    ///

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTask = ()=> {
        const trimmedTitle = titleInput.trim()
        if(trimmedTitle !== ""){
            props.addDateTask(props.IDTodolist, titleInput)
        }else {
            setError(true)
        }
        /*props.addDateTask(titleInput);*/
        setTitle("")
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if(e.key === "Enter"){
            addTask()
            setTitle("")
        }
    }
    ////

    const handlerCreator = (IDTodolist: string, filter: FilterValueType) => {
        return props.changeFilter(props.IDTodolist, filter);
    }
    return (
        <div>
            <div>
                <div className="todolist-title">
                    <h3>{props.title}</h3>
                    <button onClick={() => props.deleteTodolist(props.IDTodolist)}>X</button>
                </div>

                <div>
                    <input
                        className={error ? "error-input" : ""}
                        value={titleInput}
                        onChange={(e) => onChangeHandler(e)}
                        onKeyDown={(e) => onKeyDownHandler(e)}
                    />
                    <button onClick={addTask}>+</button>
                    {
                        error && <div className="errorRe">введите текст</div>
                    }

    {/** useRef for input  */}
                    {/*<input
                         type="text"
                         ref={ref}
                    />
                    <button
                        onClick={()=> {
                                if(ref.current){
                                    ref.current && props.addDateTask(ref.current.value)
                                    ref.current.value = ""
                                }git
                            }
                        }>+
                    </button>*/}
    {/** /////*/}

                </div>
                <div>
                    <button className={props.filter === "all"  ? "btn-actve" : ""} onClick={()=>handlerCreator(props.IDTodolist, "all")}>All</button>
                    <button className={props.filter === "active"  ? "btn-actve" : ""} onClick={()=>handlerCreator(props.IDTodolist, "active")}>Active</button>
                    <button className={props.filter === "completed"  ? "btn-actve" : ""} onClick={()=>handlerCreator(props.IDTodolist, "completed")}>Completed</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;