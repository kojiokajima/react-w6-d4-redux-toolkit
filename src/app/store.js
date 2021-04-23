import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice' // --> userSlice.userSlice.reducerを名前を変えてimportしてる
import chatReducer from '../features/chatSlice' // --> chatSlice.jsのchatSlice.reducerを名前を変えてimportしてる


export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  },
});
