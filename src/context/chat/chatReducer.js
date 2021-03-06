import { types } from "../../types/types";


export const chatReducer = (state, action) => {
  switch (action.type) {

    case types.closeSession: {
      return {
        uid: '',
        activeChat: null,
        users: [],
        messages: []
      }
    }
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
      if(state.activateChat === action.payload.from || 
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
    case types.loadMessages: {
      return {
        ...state,
        messages: [...action.payload]
      }
    }
  
    default:
      return state;
  }
}