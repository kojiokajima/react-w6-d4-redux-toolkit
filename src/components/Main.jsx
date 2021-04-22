import React from 'react' 
import styled from 'styled-components'

import Sidebar from './SideBar';
import Chat from './Chat'

const MainContainer = styled.div`
    display: flex
`

const Main = () => (
    <MainContainer>
        <Sidebar />
        <Chat />
    </MainContainer>
)

export default Main
