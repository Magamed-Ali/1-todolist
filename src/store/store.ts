import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../reducer/tasksReducer";
import {todoListReducer} from "../reducer/todoListReducer";

export type rootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasksReducer,
    todoListReducer
})

export const store = legacy_createStore(rootReducer)



// @ts-ignore
window.store = store