import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ContextWrapper } from './context/ContextWrapper'



function App() {
  

  return (
    <>
    <ContextWrapper>
    <Header/>
    <Outlet/>
    </ContextWrapper>
    </>
  )
}


export default App
