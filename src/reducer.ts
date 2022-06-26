import {MessageType} from "./components/Chat";

export default (state: initialStateType, action: any) => {
    switch (action.type) {
        case 'JOINED':
            return {
                ...state,
                joined: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId
            }
        case 'SET-DATA':
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages
            }
        case 'SET-USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'NEW-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload]
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
    messages: MessageType[]
}
export type ActionsType = {}