import {TodoTasksType} from "../App";

export const ADD_TASK_LIST = "ADD-TASK-LIST";
export const DELETE_TODO_LIST = "DELETE-TODO-LIST";
export const ADD_TODO_LIST = "ADD-TODO-LIST";

type ActionsType = TypeAddTaskList | TypeDeleteTodoList | TypeAddTodoList
type TypeAddTaskList = ReturnType<typeof addDateTaskList>
type TypeDeleteTodoList = ReturnType<typeof todoListDelete>
type TypeAddTodoList = ReturnType<typeof addTodoList>
export const todoListReducer = (state: Array<TodoTasksType>, action: ActionsType): Array<TodoTasksType>  => {
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
        case "ADD-TODO-LIST":
            return (
                [...state, action.payload.newTasks]
            )
        default: return state
    }
}
export const addDateTaskList = (IDTodolist: string, titleInput: string) => {
    return {
        type: ADD_TASK_LIST,
        payload: {
            IDTodolist,
            titleInput
        }
    }as const
}
export const todoListDelete = (IdIsDone: string) => {
    return {
        type: DELETE_TODO_LIST,
        payload: {
            IdIsDone
        }
    }as const
}

export const addTodoList = (newTasks: TodoTasksType) => {
    return {
        type: ADD_TODO_LIST,
        payload: {
            newTasks
        }
    }as const
}