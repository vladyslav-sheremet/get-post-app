import { FormSection } from './components/FormSection/FormSection'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Users } from './components/Users/Users'
import { useFetchData } from './hooks/useFetchData'
import { IUser } from './models'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Users />
      <FormSection />
    </>
  )
}

export default App
