import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload
    },
    // --> stateにはuserSliceのstateが、
    // action.payloadには、dispatch(login())って呼んだ時のloginの中のargumentが入る cf) App.js Line 17
    logout: (state, action) => {
      state.currentUser = null
    },
  }
})

export const { login, logout } = userSlice.actions
// --> userSlice.actionsはこんな感じ -- {login: ƒ, logout: ƒ}
// --> reducersの中身が入るのか
// --> ちなみにuserSlice自体はこんな感じ -- {name: "user", actions: {…}, caseReducers: {…}, reducer: ƒ}
// 

console.log("WHAT IS THIS ", userSlice);

export const selectUser = (state) => {
  // console.log("STATE IS ", state);
  return (state.user.currentUser)
}
// --> stateには、{user: {currentUser: {displayName: ..., email: ..., photo: ..., uid: ...,}}, chat: {chatId: ..., chatName: ...}}が入ってる
// -->userとchatのkey(currentUserとchatId、chatName)は、chatSlice.jsとuserSlice.jsのinitialStateで自分で決めたやつ

export default userSlice.reducer