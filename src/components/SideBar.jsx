import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core'
import {RateReviewOutlined} from '@material-ui/icons'
import {useSelector} from 'react-redux'
import styled from 'styled-components'

import {selectUser} from '../features/userSlice'
import {auth, db} from '../firbase/firebase'
import SideBarChat from './SideBarChat'

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
`;

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`;

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #e1e1e1;
  color: gray;
  border-radius: 5px;
`;

const SidebarChats = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
​
  &::-webkits-scrollbar {
    display: none;
  }
`;

const SideBar = () => {
  const user = useSelector(selectUser)
  const [chats, setChats] = useState([])

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => setChats(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
    ))
  }, [])

  const addChat = () => {
    const chatName = prompt("Please enter a chat name")
    if(chatName) {
      db.collection("chats").add({
        chatName　// --> chatName: chatNameみたいにkeyとvalueが同じ名前だとこう書ける
      })
    }
  }
  // console.log("CHATTTTTT: ", chats);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarAvatar src={user.photo} onClick={() => auth.signOut()} />
        {/* auth.signOut()でリアルガチサインアウトしてる */}
        <SidebarTitle>{user.displayName}</SidebarTitle>
        <IconButton
          variant="outline"
          onClick={addChat}
        >
          <RateReviewOutlined />
        </IconButton>
      </SidebarHeader>
      <SidebarChats>
        {
          chats.map(({id, data: {chatName}}) => {
            // console.log("HIHIHIO: ", chatName);
            return (
            <SideBarChat key={id} id={id} chatName={chatName} />
          )})
        }
      </SidebarChats>
    </SidebarContainer>
  )
}

export default SideBar