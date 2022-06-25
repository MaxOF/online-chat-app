export default (state: initialStateType, action: any) => {
    switch (action.type) {
        case 'IS-AUTH':
            return {
                ...state, isAuth: action.payload
            }
        default:
            return state
    }
}

export type initialStateType = {
    isAuth: boolean
}
export type ActionsType = {

}