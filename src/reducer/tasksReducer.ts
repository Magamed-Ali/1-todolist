import {FilterValueType, TasksType, TaskType1} from "../App";
import {v1} from "uuid";
import {TypeAddTodoList} from "./todoListReducer";
export const REMOVE_TASK_AC = "REMOVE-TASK-AC";
export const FILTER_TASK = "FILTER-TASK";
export const TASK_STATUS = "TASK-STATUS";
export const ADD_TODOLIST = "ADD_TODOLIST";
export const TITLE_FIXED = "TITLE-FIXED";
export const ADD_TASKS = "ADD_TASKS"
export const NEW_ADD_TASK_TODO_LIST = "NEW-ADD-TASK-TODO-LIST"

type TsarType = TypeRemove | TypeFilter | TypeStatus  | TypeFixedTitle | TypeAddTodoList| TypeAddTasks
type TypeRemove = ReturnType<typeof removeTaskTypeAC>
type TypeFilter = ReturnType<typeof removeFilterAC>
type TypeStatus = ReturnType<typeof changeStatusAC>
type TypeAddTasks = ReturnType<typeof addTasksAC>
type TypeFixedTitle = ReturnType<typeof fixedTitleTaskAC>
// type TypeAddNewTodoList = ReturnType<typeof newTodoList>

const initialState: TasksType = {}
export const tasksReducer = (state = initialState, action: TsarType): TasksType => {
    switch (action.type) {
        case REMOVE_TASK_AC:
            return {...state, [action.payload.ID] : {...state[action.payload.ID], data: [...state[action.payload.ID].data
            .filter(el => el.id !== action.payload.taskId)] }
            }
        case FILTER_TASK:
            return {
                ...state, [action.payload.IDTodolist]: {
                    ...state[action.payload.IDTodolist], filter: action.payload.filter}
            }
        case TASK_STATUS:
            return {
                ...state, [action.payload.IDTodolist] : {...state[action.payload.IDTodolist], data: [...state[action.payload.IDTodolist].data
                        .map(item => item.id === action.payload.taskId ? {...item, isDone: action.payload.newStatus} : item) ]}
            }
        case "ADD-TODO-LIST":

            return {...state,[action.payload.idTodo] : {
                data : [],
                    filter: "all"
                }}
        case TITLE_FIXED:
            return {
                ...state, [action.payload.IdTodoList] : {...state[action.payload.IdTodoList], data: [...state[action.payload.IdTodoList].data
                    .map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)]}
            }
        case ADD_TASKS:
            return {
                ...state, [action.payload.IDTodolist]: {...state[action.payload.IDTodolist], data: [...state[action.payload.IDTodolist].data, action.payload.newTask]}
            }
        // case NEW_ADD_TASK_TODO_LIST:
        //     return{...state, [action.payload.idTodo]: {data: action.payload.newDataTask, filter: "all"}}

        default: return state
    }
}

export const removeTaskTypeAC = (ID: string, taskId: string) => {
    return {
        type: REMOVE_TASK_AC,
        payload: {
            ID: ID,
            taskId: taskId
        }
    }as const
}
export const removeFilterAC = (IDTodolist: string, filter: FilterValueType) => {
    return {
        type: FILTER_TASK,
        payload: {
            IDTodolist,
            filter
        }
    } as const
}
export const changeStatusAC = (IDTodolist: string, taskId: string, newStatus: boolean) => {
    return {
        type: TASK_STATUS,
        payload: {
            IDTodolist,
            taskId,
            newStatus
        }
    } as const
}
export const addTasksAC = (IDTodolist: string, title: string, newTask: TaskType1) => {
    return {
        type: ADD_TASKS,
        payload: {
            IDTodolist,
            title,
            newTask
        }
    }as const
}
export const fixedTitleTaskAC = (IdTodoList : string, id: string, title: string) => {
    return {
        type: TITLE_FIXED,
        payload: {
            IdTodoList,
            id,
            title
        }
    } as const
}
// export const addTodoList = (idTodo: string, title: string) => {
//     return{
//         type: ADD_TODOLIST,
//         payload: {
//             idTodo,
//             title
//         }
//     }as const
