import React, {memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {fixedTitleTaskAC, removeTaskTypeAC} from "./reducer/tasksReducer";
import SuperCheckBox from "./components/SuperCheckBox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodoList";

type taskType = {
    task: TaskType
    IDTodolist: string
    changeStatusEvent: (task: string, check: boolean) => void
}
export const Task = memo((props: taskType) => {

    console.log("TASKkkkkk")

    const dispatch = useDispatch()

    const editTasksHandler = useCallback(function (title: string) {console.log("TA111")
        dispatch(fixedTitleTaskAC(props.IDTodolist, props.task.id, title))
    }, [props.IDTodolist, props.task.id])

    const deleteTask = useCallback((id: string) => {
        dispatch(removeTaskTypeAC(props.IDTodolist, id))
    }, [props.IDTodolist])

    const changeStatus = useCallback((check: any) => {
        props.changeStatusEvent(props.task.id, check)
    }, [props.task.id])

    return (
        <div key={props.task.id} className="todolist-tasks">
            <SuperCheckBox task={props.task.isDone} callBack={(check) => changeStatus(check)}/>

            <span className={props.task.isDone ? "task-done" : "task-doneOf"}>
                    <EditableSpan
                        title={props.task.title}
                        editTasksHandler={editTasksHandler}
                    />
                        </span>
            <IconButton aria-label="delete" size="small"
                        onClick={() => deleteTask(props.task.id)}>
                <DeleteIcon fontSize="inherit" style={{color: "601313BF"}}/>
            </IconButton>
        </div>
    )
})