import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../reducer/tasksReducer";
import {todoListReducer} from "../reducer/todoListReducer";
import {reducerAuth} from "../reducer/auth-reducer";

export type rootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasksReducer,
    todoListReducer,
    reducerAuth
})

export const store = legacy_createStore(rootReducer)



// @ts-ignore
window.store = store