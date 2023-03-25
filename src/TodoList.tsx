import React, {memo, useCallback} from 'react';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {FilterValueType} from "./App";
import {SuperInpit} from "./components/SuperInpit";
import {EditableSpan} from "./components/EditableSpan";
import {Simulate} from "react-dom/test-utils";
import {useDispatch, useSelector} from "react-redux";
import {addTasksAC, changeStatusAC, removeFilterAC} from "./reducer/tasksReducer";
import {v1} from "uuid";
import {addDateTaskListAC, todoListDeleteAC} from "./reducer/todoListReducer";
import {rootReducerType} from "./store/store";
import {TaskType1} from "./AppWidthRedux";
import {Task} from "./Task";

type TodoListPropsType = {
    IDTodolist: string
    title: string,

}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const TodoList = memo((props: TodoListPropsType) => {

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

    let task = useSelector<rootReducerType, TaskType1[]>(state => state.tasksReducer[props.IDTodolist].data);
    let filter = useSelector<rootReducerType, FilterValueType>(state => state.tasksReducer[props.IDTodolist].filter);

    const dispatch = useDispatch()

    const changeStatusEvent = useCallback((task: string, check: boolean) => {
        dispatch(changeStatusAC(props.IDTodolist, task, check))
    }, [props.IDTodolist])

    if (filter === "active") {
        task = task.filter(el => el.isDone === true)
    }
    if (filter === "completed") {
        task = task.filter(el => el.isDone === false)
    }


    const handlerCreator = useCallback((IDTodolist: string, filter: FilterValueType) => {
        console.log("handlerCreator")
        dispatch(removeFilterAC(props.IDTodolist, filter))
    }, [props.IDTodolist])

    const inputAddTasks = useCallback((titleInput: string) => {
        console.log("inputAddTasks")
        const newTask = {id: v1(), title: titleInput, isDone: false}
        dispatch(addTasksAC(props.IDTodolist, titleInput, newTask))
    }, [props.IDTodolist])
    const inputAddTodolistTitle = useCallback((titleInput: string) => {
        console.log("inputAddTodolistTitle")
        dispatch(addDateTaskListAC(props.IDTodolist, titleInput))
    },[props.IDTodolist])
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
                    <DeleteForeverIcon style={{color: "#3752c2", cursor: "pointer"}} onClick={() => {
                        dispatch(todoListDeleteAC(props.IDTodolist))
                        //delete task[props.IDTodolist]
                    }}/>
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
                    <Button style={button} variant={filter === "all" ? "outlined" : "contained"}
                            color="primary"
                            onClick={() => handlerCreator(props.IDTodolist, "all")}>All</Button>
                    <Button style={button}
                            variant={filter === "active" ? "outlined" : "contained"}
                            color="success"
                            onClick={() => handlerCreator(props.IDTodolist, "active")}>Active</Button>
                    <Button style={button}
                            variant={filter === "completed" ? "outlined" : "contained"}
                            color="secondary"
                            onClick={() => handlerCreator(props.IDTodolist, "completed")}>Completed</Button>
                </div>

                <ul>
                    {task.length
                        ? task.map((task: TaskType) => {
                            return (
                                <Task
                                    key={task.id}
                                    task={task}
                                    IDTodolist={props.IDTodolist}
                                    changeStatusEvent={changeStatusEvent}
                                    />
                            )
                        })
                        : <span>Your taskslist is empty</span>}
                </ul>
            </div>
        </div>
    );
})

