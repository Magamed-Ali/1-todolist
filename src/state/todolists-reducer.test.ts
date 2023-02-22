import {v1} from "uuid";
import {
    AddTodoList, ChangeTodolistFilter, ChangeTodolistTitle,
    RemoveTodoList,
    todolistReducer,
    TodolistType
} from "./todolists-reducer";
import {FilterValueType} from "../App";


test("correct todolist should be removed", ()=> {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, RemoveTodoList(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", ()=> {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTitle = "New Todolist"
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, AddTodoList(newTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist")
})

test("correct todolist should change its name", ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const endState = todolistReducer(startState, ChangeTodolistTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed', ()=> {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = "completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, ChangeTodolistFilter(todolistId2, newFilter))

    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe("all")

})