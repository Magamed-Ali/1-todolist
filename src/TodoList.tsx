import React, {KeyboardEventHandler, useRef, useState} from 'react';
import {FilterValueType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValueType) => void
    addDateTask: (item: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

function TodoList(props: TodoListPropsType) {

    const [titleInput, setTitle] = useState('')

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
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => removeTask(task.id)}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    ///

    const Inputchange = (e: any) =>{
        setTitle(e.target.value)
    }

    const addButton = ()=> {
        props.addDateTask(titleInput);
        setTitle("")
    }
    ////
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={titleInput}
                        onChange={(e) => Inputchange(e)}
                    />
                    <button onClick={addButton}>+</button>

//////   useRef for input
                    {/*<input
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
                    </button>*/}
/////

                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter("all")}>All</button>
                    <button onClick={() => props.changeFilter("active")}>Active</button>
                    <button onClick={() => props.changeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;