import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/routes'
import { Provider } from 'react-redux'
import { store } from './store/store';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
