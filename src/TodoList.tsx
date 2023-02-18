import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
                <div key={task.id} className="todolist-tasks">

                    <Checkbox
                        checked={task.isDone}
                        defaultChecked
                        onChange={changeStatusEvent}
                        style={{maxWidth: "35px", minWidth: "35px", height: "35px"}}
                    />
                    <span className={task.isDone ? "task-done" : "task-doneOf"}>
                    <EditableSpan
                        title={task.title}
                        editTasksHandler={editTasksHandler}
                    />
                        </span>
                    <IconButton aria-label="delete" size="small"  onClick={() => removeTask(props.IDTodolist, task.id)}>
                        <DeleteIcon fontSize="inherit" style={{color: "601313BF"}}/>
                    </IconButton>
                </div>
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

    const button = {
        padding: "1px 4px",
        minWidth: "50px",
        fontSize: "12px",
        margin: "4px 2px"
    }
    return (
        <div>
            <div>
                <div className="todolist-title">
                    {/*<h3>{props.title}</h3>*/}
                    <h3>
                        <EditableSpan title={props.title} editTasksHandler={inputAddTodolistTitle}/>
                    </h3>
                    {/*<button onClick={() => props.deleteTodolist(props.IDTodolist)}><Icon color="primary" >add_circle</Icon></button>*/}
                    <DeleteForeverIcon style={{color: "#3752c2", cursor: "pointer"}} onClick={() => props.deleteTodolist(props.IDTodolist)}/>
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
                                }git
                            }
                        }>+
                    </button>
    * /////

                </div>*/}

                <div>
                    <Button style={button} variant={props.filter === "all" ? "outlined" : "contained"} color="primary"
                            onClick={() => handlerCreator(props.IDTodolist, "all")}>All</Button>
                    <Button style={button} variant={props.filter === "active" ? "outlined" : "contained"} color="success"
                            onClick={() => handlerCreator(props.IDTodolist, "active")}>Active</Button>
                    <Button style={button} variant={props.filter === "completed" ? "outlined" : "contained"} color="secondary"
                            onClick={() => handlerCreator(props.IDTodolist, "completed")}>Completed</Button>
                </div>
                <ul>
                    {tasksList}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;