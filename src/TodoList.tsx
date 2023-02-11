import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useRef, useState} from 'react';

import {FilterValueType} from "./App";
import {SuperInpit} from "./components/SuperInpit";
import {EditableSpan} from "./components/EditableSpan";

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
    addTitleTask: (IdTodoList: string, id: string, title: string) => void
    addDateTask2: (IDTodolist: string, titleInput: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {


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
        ? props.tasks.map((task: TaskType) => {
            const changeStatusEvent = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.IDTodolist, task.id, e.currentTarget.checked)
            const editTasksHandler = (title: string) => {
                props.addTitleTask(props.IDTodolist, task.id, title)
            }
            return (
                <li key={task.id}>

                    <input type="checkbox" checked={task.isDone} onChange={changeStatusEvent}/>
                    {/*<span className={task.isDone ? "task-done" : "task-doneOf"}>{task.title}</span>*/}
                    <span className={task.isDone ? "task-done" : "task-doneOf"}>
                    <EditableSpan
                        title={task.title}
                        editTasksHandler={editTasksHandler}
                    />
                        </span>
                    <button onClick={() => removeTask(props.IDTodolist, task.id)}>x
                    </button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    ///

    ////

    const handlerCreator = (IDTodolist: string, filter: FilterValueType) => {
        return props.changeFilter(props.IDTodolist, filter);
    }
    const inputAddTasks = (titleInput: string) => {
        props.addDateTask(props.IDTodolist, titleInput)
    }
    const inputAddTodolistTitle = (titleInput: string) => {
        props.addDateTask2(props.IDTodolist, titleInput)
    }

    return (
        <div>
            <div>
                <div className="todolist-title">
                    {/*<h3>{props.title}</h3>*/}
                    <h3>
                        <EditableSpan title={props.title} editTasksHandler={inputAddTodolistTitle}/>
                    </h3>
                    <button onClick={() => props.deleteTodolist(props.IDTodolist)}>X</button>
                </div>

                <SuperInpit inputAddTasks={inputAddTasks}/>
                {/*<div>
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

    * useRef for input
                    <input
                         type="text"
                         ref={ref}
                    />
                    <button
                        onClick={()=> {
                                if(ref.current){
                                    ref.current && props.addDateTask(ref.current.value)
                                    ref.current.value = ""
                                }
                            }
                        }>+
                    </button>
    * /////

                </div>*/}
                <div>
                    <button className={props.filter === "all" ? "btn-actve" : ""}
                            onClick={() => handlerCreator(props.IDTodolist, "all")}>All
                    </button>
                    <button className={props.filter === "active" ? "btn-actve" : ""}
                            onClick={() => handlerCreator(props.IDTodolist, "active")}>Active
                    </button>
                    <button className={props.filter === "completed" ? "btn-actve" : ""}
                            onClick={() => handlerCreator(props.IDTodolist, "completed")}>Completed
                    </button>
                </div>
                <ul>
                    {tasksList}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;