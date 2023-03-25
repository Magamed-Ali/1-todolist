import {combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from "../reducer/tasksReducer";
import {todoListReducer} from "../reducer/todoListReducer";


const rootReducer = combineReducers({
        tasksReducer,
        todoListReducer
    }
)

export const store = legacy_createStore(rootReducer)

export type StateType = ReturnType<typeof rootReducer>