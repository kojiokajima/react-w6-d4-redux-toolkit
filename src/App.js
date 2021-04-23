import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { selectUser, login, logout } from './features/userSlice'
// import {selectChatId, selectChatName} from './features/chatSlice'
import { auth } from './firbase/firebase'
import Login from './components/Login'
import Main from './components/Main'

const App = () => {
  const user = useSelector(selectUser)
  // const chatName = useSelector(selectChatName)
  // const chatId = useSelector(selectChatId)
  const dispatch = useDispatch()
  console.log("USER IS ", user);
  // console.log("NAME IS ", chatName);
  // console.log("ID IS ", chatId);


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("authUser is ", authUser);
      // --> authUserの中はこんな感じ -- Im {J: Array(0), l: "AIzaSyA-lXC5Sn_yTj0TCN3eH-bzRj0CfSVPpNs", m: "[DEFAULT]", s: "imessage-8a69c.firebaseapp.com", a: Ii, …}
      // --> めっちゃいろんな情報入ってるからその中から欲しいやつだけピックアップするんだねぇ
      // --> ピックアップした情報(オブジェクト)をlogin関数にpayloadとして渡して、currentUserにセットしてるんだねぇ
      if (authUser) {
        // --> SideBar.jsxでauth.signout()実行すると、authUserがfalseになって、
        // else分に飛んで、reducerの中のlogout()が呼ばれてcurrentUserがnullになる
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
        // --> dispatch([reducerの中の関数])ってするだけでいいの便利だなぁ
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])
  // }, [])

  return (
    <>
      {
        user ? <Main /> : <Login />
      }
    </>
  )
}

export default App