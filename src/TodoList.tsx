import React, {ChangeEvent, InputHTMLAttributes, KeyboardEvent, useRef, useState} from 'react';
import {FilterValueType} from "./App";

type TodoListPropsType = {
    Id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, filter: FilterValueType) => void
    addDateTask: ( todolistID: string, item: string) => void
    checkboxRemove: (IdIsDone: string,todolistID: string, oppositeIsDone: boolean) => void
    filter: FilterValueType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const [titleInput, setTitle] = useState('')
    const [error, setError] = useState(false)

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
            return (
                <li>
                    <input type="checkbox"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => props.checkboxRemove(task.id,props.Id, e.currentTarget.checked)}
                           checked={task.isDone}
                    />
                    <span className={task.isDone ? "titleCrossOut" : "titleTransparent"}>{task.title}</span>
                    <button onClick={() => removeTask(props.Id, task.id)}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setError(false)
        setTitle(e.target.value)
    }

    const addButton = ()=> {
        const inputTitle = titleInput.trim()
        if(inputTitle !== ""){
            props.addDateTask(props.Id, titleInput.trim());
        }else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e)
        if(e.key === "Enter"){
            addButton()
        }
    }

    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeFilter(props.Id, filter);
    }
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={titleInput}
                        onChange={(e) => onChangeHandler(e)}
                        onKeyDown={(e) => onKeyDownHandler(e)}
                    />

                    <button onClick={addButton}>+</button>

                    {/**   useRef for input */}
                   {/* {<input
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
                    </button>} */}

                </div>
                {
                    error ? <div className="errorText">Enter text!</div> : <div></div>
                }

                <div>
                    <button className={props.filter === "all" ? "activeButton" : ""} onClick={handlerCreator("all")}>All</button>
                    <button className={props.filter === "active" ? "activeButton" : ""} onClick={handlerCreator("active")}>Active</button>
                    <button className={props.filter === "completed" ? "activeButton" : ""} onClick={handlerCreator("completed")}>Completed</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;