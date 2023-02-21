import {FilterValueType, TasksType, TaskType1} from "../App";
export const REMOVE_TASK_AC = "REMOVE-TASK-AC";
export const FILTER_TASK = "FILTER-TASK";
export const TASK_STATUS = "TASK-STATUS";
export const ADD_TASKS = "ADD-TASKS";
export const TITLE_FIXED = "TITLE-FIXED";
export const NEW_ADD_TASK_TODO_LIST = "NEW-ADD-TASK-TODO-LIST"

type TsarType = TypeRemove | TypeFilter | TypeStatus | TypeAddTasks | TypeFixedTitle | TypeAddNewTodoList
type TypeRemove = ReturnType<typeof removeTaskType>
type TypeFilter = ReturnType<typeof removeFilterAC>
type TypeStatus = ReturnType<typeof changeStatus>
type TypeAddTasks = ReturnType<typeof addTasks>
type TypeFixedTitle = ReturnType<typeof fixedTitleTask>
type TypeAddNewTodoList = ReturnType<typeof newAddTaskTodoList>
export const tasksReducer = (state: TasksType, action: TsarType): TasksType => {
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
        case ADD_TASKS:
            return {
                ...state, [action.payload.IDTodolist]: {...state[action.payload.IDTodolist], data: [...state[action.payload.IDTodolist].data, action.payload.newTask]}
            }
        case TITLE_FIXED:
            return {
                ...state, [action.payload.IdTodoList] : {...state[action.payload.IdTodoList], data: [...state[action.payload.IdTodoList].data
                    .map(item => item.id === action.payload.id ? {...item, title: action.payload.title} : item)]}
            }
        case NEW_ADD_TASK_TODO_LIST:
            return{...state, [action.payload.idTodo]: {data: action.payload.newDataTask, filter: "all"}}

        default: return state
    }
}

export const removeTaskType = (ID: string, taskId: string) => {
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
export const changeStatus = (IDTodolist: string, taskId: string, newStatus: boolean) => {
    return {
        type: TASK_STATUS,
        payload: {
            IDTodolist,
            taskId,
            newStatus
        }
    } as const
}
export const addTasks = (IDTodolist: string, title: string, newTask: TaskType1) => {
    return {
        type: ADD_TASKS,
        payload: {
            IDTodolist,
            title,
            newTask
        }
    }as const
}
export const fixedTitleTask = (IdTodoList : string, id: string, title: string) => {
    return {
        type: TITLE_FIXED,
        payload: {
            IdTodoList,
            id,
            title
        }
    } as const
}
export const newAddTaskTodoList = (idTodo: string, newDataTask: Array<TaskType1>) => {
    return{
        type: NEW_ADD_TASK_TODO_LIST,
        payload: {
            idTodo,
            newDataTask
        }
    }as const
}