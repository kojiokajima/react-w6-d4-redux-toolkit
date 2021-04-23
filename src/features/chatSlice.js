import {createSlice} from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    chatName: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload.chatId
      state.chatItem = action.payload.chatName
      // action.payloadには、dispatch(setChat())って呼んだ時のsetChatの中のargumentが入る cf) SideBarChat.js Line 50

    }
  }
})

export const {setChat} = chatSlice.actions

export const selectChatId = (state) => {
  console.log("CHAT CHAT ", state.chat);
  return state.chat.chatId
} // --> selectorの代わりかなこれ
export const selectChatName = (state) => state.chat.chatName // --> selectorの代わりかなこれ

export default chatSlice.reducer
// --> createSlice(.....).reducerが今まででいうuserReducerみたいになってる。