import {TasksType, TodoTasksType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, todoListReducer} from "./todoListReducer";
import {tasksReducer} from "./tasksReducer";

test("added new TodoList", () => {
    const todoList: Array<TodoTasksType> = [];
    const task: TasksType = {};

    let idTodo = v1();

    const newTodoListAC = addTodoListAC(idTodo, "ttt");

    const todolistReducer = todoListReducer(todoList, newTodoListAC);
    const taskTodo = tasksReducer(task, newTodoListAC)

    const newKey = Object.keys(taskTodo)


    expect(todolistReducer.length).toBe(1)
    expect(taskTodo[idTodo].filter).toBe("all")
    expect(todolistReducer[0].id).toBe(newKey[0])

})
