import {TodoTasksType} from "../App";
import {v1} from "uuid";
import {TodoListID1, TodolistID2} from "./tasksReducer";

export const ADD_TASK_LIST = "ADD-TASK-LIST";
export const DELETE_TODO_LIST = "DELETE-TODO-LIST";
export const ADD_TODO_LIST = "ADD-TODO-LIST";

type ActionsType = TypeAddTaskList | TypeDeleteTodoList | TypeAddTodoList
type TypeAddTaskList = ReturnType<typeof addDateTaskListAC>
type TypeDeleteTodoList = ReturnType<typeof todoListDeleteAC>
export type TypeAddTodoList = ReturnType<typeof addTodoListAC>

let initialState: Array<TodoTasksType> = [
    {id: TodoListID1, title: "What to learn"},
    {id: TodolistID2, title: "What to buy"}
]
export const todoListReducer = (state  = initialState, action: ActionsType): Array<TodoTasksType>  => {
    switch (action.type) {
        case ADD_TASK_LIST:
            return (
                state.map(item => item.id === action.payload.IDTodolist ?
                    {...item, title: action.payload.titleInput}
                    : item)
            )
        case DELETE_TODO_LIST:
            return (
                state.filter(el => el.id !== action.payload.IdIsDone)
            )
        case ADD_TODO_LIST:
            const newTodo = { id: action.payload.idTodo, title : action.payload.title }
            return [...state, newTodo]

        default: return state
    }
}
export const addDateTaskListAC = (IDTodolist: string, titleInput: string) => {
    return {
        type: ADD_TASK_LIST,
        payload: {
            IDTodolist,
            titleInput
        }
    }as const
}
export const todoListDeleteAC = (IdIsDone: string) => {
    return {
        type: DELETE_TODO_LIST,
        payload: {
            IdIsDone
        }
    }as const
}

export const addTodoListAC = (idTodo : string, title : string) => {
    return {
        type: ADD_TODO_LIST,
        payload: {
            idTodo,
           title
        }
    }as const
}