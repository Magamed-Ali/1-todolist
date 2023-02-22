import {v1} from "uuid";
import {FilterValueType} from "../App";


export  type TodolistType = {
    id:string
    title: string
    filter: FilterValueType
}

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type RemoveTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}


export type ActionType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListActionType |
    RemoveTodoListFilterActionType

export const todolistReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODOLIST':
            const newObj = {id: v1(), title: action.title, filter: "all"}
            return [...state, newObj];
        case "CHANGE-TODOLIST-TITLE":
            return (
                state.map(it => it.id === action.id ? {...it, title: action.title} : it)
            )
        case "CHANGE-TODOLIST-FILTER":
            return (
                state.map(it => it.id === action.id ? {...it, filter: action.filter} : it)
            )
        default:
            throw new Error("I don`t understand this type")
    }
}

export const RemoveTodoList = (todolist: string): RemoveTodoListActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolist
    }
}
export const AddTodoList = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}
export const ChangeTodolistTitle = (id: string, title: string): ChangeTodoListActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const ChangeTodolistFilter = (id: string, filter: FilterValueType): RemoveTodoListFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}