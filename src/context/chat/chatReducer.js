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
    case types.newMessage: {
      // console.log("funciona", state.activateChat, state.activateChat, action.payload.to)
      if(state.activateChat === state.activateChat || 
        state.activateChat === action.payload.to) {
          // console.log("aqui!!!");
        return {
          ...state,
          messages: [...state.messages, action.payload]
        }
      } else {
        return state;
      }
    }
  
    default:
      return state;
  }
}