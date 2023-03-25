import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducer/tasksReducer";
import {todoListReducer} from "../reducer/todoListReducer";


const rootReducer = combineReducers({
        tasksReducer,
        todoListReducer
    }
)

export const store = createStore(rootReducer)

type StateType = ReturnType<typeof rootReducer>