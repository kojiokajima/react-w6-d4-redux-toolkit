import {createSlice} from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    chatName: null,
  },
  reducers: {
    // この中身を、他のコンポーネントで(const dispatch = useDispatch()ってしたあと)dispatch(setChat({...}))って感じで使えるんだね
    setChat: (state, action) => {
      state.chatId = action.payload.chatId
      state.chatName = action.payload.chatName
      // action.payloadには、dispatch(setChat())って呼んだ時のsetChatの中のargumentが入る cf) SideBarChat.js Line 50
      // ちなみにstate.chatNameをstate.chatItemって書いてておかしくなってた。ちゃんと名前確認する。

    }
  }
})

export const {setChat} = chatSlice.actions

export const selectChatId = (state) => state.chat.chatId // --> selectorの代わりかなこれ
export const selectChatName = (state) => state.chat.chatName // --> selectorの代わりかなこれ

export default chatSlice.reducer
// --> createSlice(.....).reducerが今まででいうuserReducerみたいになってる。