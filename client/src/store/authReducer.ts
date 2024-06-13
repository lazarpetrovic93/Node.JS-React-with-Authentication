import Types from './actionTypes'
import { User } from './context'
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key
  }
  : {
    type: Key
    payload: M[Key]
  }
}

type AuthPayload = {
  [Types.SetAuthData]: User
}

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>]

export const authReducer = (
  state: User,
  action: AuthActions
) => {
  switch (action.type) {
    case Types.SetAuthData:
      return action.payload
    default:
      return state
  }
}
