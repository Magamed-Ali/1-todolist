import {v1} from "uuid";
import {TasksType, TodoTasksType} from "../App";
import {addTasksAC, changeStatusAC, fixedTitleTaskAC, removeTaskTypeAC, tasksReducer} from "./tasksReducer";
import {addTodoListAC, todoListDeleteAC, todoListReducer} from "./todoListReducer";

test('correct task should be deleted from correct array', () => {
    const todoListTasks: TodoTasksType[] = [
        {id: "TodoListID1", title: "What to learn"},
        {id: "TodolistID2", title: "What to buy"}
    ]

    const startState: TasksType = {
        ["TodoListID1"]: {
            data: [
                {id: "1", title: "HTML", isDone: true},
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    }


    const action = removeTaskTypeAC('TodoListID1', startState['TodoListID1'].data[0].id)

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        ["TodoListID1"]: {
            data: [
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    })
    expect(endState["TodoListID1"].data.length).toBe(5)
})
test('correct task should be added to correct array', () => {
    const todoListTasks: Array<TodoTasksType> = [
        {id: "TodoListID1", title: "What to learn"},
        {id: "TodolistID2", title: "What to buy"}
    ]

    const startState: TasksType = {
        ["TodoListID1"]: {
            data: [
                {id: "1", title: "HTML", isDone: true},
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    }

    const newTask = {id: "7", title: "HTML-5", isDone: false}
    const action = addTasksAC("TodolistID2", 'React', newTask)

    const endState = tasksReducer(startState, action)


    expect(endState["TodolistID2"].filter).not.toBe("8")
    expect(endState["TodolistID2"].data[0].id).toBeDefined()
    expect(endState["TodolistID2"].data[6].title).toBe("HTML-5")
    expect(endState["TodolistID2"].data[6].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const todoListTasks: Array<TodoTasksType> = [
        {id: "TodoListID1", title: "What to learn"},
        {id: "TodolistID2", title: "What to buy"}
    ]

    const startState: TasksType = {
        ["TodoListID1"]: {
            data: [
                {id: "1", title: "HTML", isDone: true},
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    }

    const action = changeStatusAC("TodolistID2", "1", false)

    const endState = tasksReducer(startState, action)

    expect(endState["TodolistID2"].data[0].isDone).toBe(false)
    expect(endState["TodolistID2"].data[0].isDone).not.toBe(true)
})

test('status of specified task should be title', () => {
    const todoListTasks: Array<TodoTasksType> = [
        {id: "TodoListID1", title: "What to learn"},
        {id: "TodolistID2", title: "What to buy"}
    ]

    const startState: TasksType = {
        ["TodoListID1"]: {
            data: [
                {id: "1", title: "HTML", isDone: true},
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    }

    const action = fixedTitleTaskAC("TodolistID2", "1", "111")

    const endState = tasksReducer(startState, action)

    expect(endState["TodolistID2"].data[0].title).toBe("111")
    expect(endState["TodolistID2"].data[0].isDone).not.toBe("HTML11")
})
test('status of specified task should be todoList', () => {
    const todoListTasks: Array<TodoTasksType> = [
        {id: "TodoListID1", title: "What to learn"},
        {id: "TodolistID2", title: "What to buy"}
    ]

    const startState: TasksType = {
        ["TodoListID1"]: {
            data: [
                {id: "1", title: "HTML", isDone: true},
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    }

    const startTodoList = addTodoListAC("TodoListID3", "What to thue")
    const endTodoList = todoListReducer(todoListTasks, startTodoList)

    const startTasks = addTodoListAC("TodoListID3", "What to thue")
    const endTasks = tasksReducer(startState, startTasks)


    expect(endTodoList.length).toBe(3)
    expect(endTasks["TodoListID3"].data.length).toBe(0)
    expect(endTasks["TodoListID3"].filter).toBe("all")
})
test('status of specified task should be todoList', () => {
    const todoListTasks: Array<TodoTasksType> = [
        {id: "TodoListID1", title: "What to learn"},
        {id: "TodolistID2", title: "What to buy"}
    ]

    const startState: TasksType = {
        ["TodoListID1"]: {
            data: [
                {id: "1", title: "HTML", isDone: true},
                {id: "2", title: "HTML", isDone: true},
                {id: "3", title: "JS/TS", isDone: false},
                {id: "4", title: "HTML", isDone: true},
                {id: "5", title: "HTML", isDone: false},
                {id: "6", title: "JS/TS", isDone: false}
            ],
            filter: "all"
        },
        ["TodolistID2"]: {
            data: [
                {id: "1", title: "HTML11", isDone: true},
                {id: "2", title: "HTML22", isDone: true},
                {id: "3", title: "JS/TS22", isDone: false},
                {id: "4", title: "HTML22", isDone: true},
                {id: "5", title: "HTML22", isDone: false},
                {id: "6", title: "JS/TS22", isDone: false}
            ],
            filter: "completed"
        }
    }

    const startTodoList = todoListDeleteAC("TodoListID1")
    const endTodoList = todoListReducer(todoListTasks, startTodoList)
    delete startState["TodoListID1"]

    expect(endTodoList.length).toBe(1)
    expect(startState["TodoListID1"]).toBeUndefined()




})