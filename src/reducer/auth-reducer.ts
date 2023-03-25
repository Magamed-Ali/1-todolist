const SET_USER_DATE = "SET_USER_DATE"

type stateTypeAuth = {
    userId: number
    email: string
    login: string
    isFeatching: boolean
}
let initialState = {
    userId: 2,
    email: 'dfdfdfdf',
    login: "samurai",
    isFeatching: false
}

type actionType = setUserAC
type setUserAC = ReturnType<typeof setUserAC>
export const reducerAuth = (state: stateTypeAuth = initialState, action: actionType): stateTypeAuth => {
    switch (action.type) {
        case SET_USER_DATE:
            return state
        default: return state
    }
}

export const setUserAC = (login: string, userId: string, email: string) => {
    return {
        type: SET_USER_DATE,
        payload: {
            userId,
            login,
            email
        }
    } as const
}