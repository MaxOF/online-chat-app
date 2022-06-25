export default (state: initialStateType, action: any) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId
            }
        case 'SET-USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'SET-MESSAGES':
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state
    }
}

export type initialStateType = {
    joined: boolean
    roomId: string
    userName: string
    users: []
    messages: []
}
export type ActionsType = {

}