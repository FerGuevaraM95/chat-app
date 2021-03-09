import { types } from "../../types/types";


export const chatReducer = (state, action) => {
  switch (action.type) {
    
    case types.usersLoaded: {
      return {
        ...state,
        users: [...action.payload]
      }
    }
    case types.activateChat: {
      if(state.activateChat === action.payload) return state;
      return {
        ...state,
        activeChat: action.payload,
        messages: []
      }
    }
  
    default:
      return state;
  }
}