import './App.css'
import Forms from './pages/Forms'
import Dashboard from './pages/Dashboard'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './auth'
import * as api from './api'

function App() {

  const auth = useAuth()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Forms />,
      errorElement: <h1>404</h1>,
      loader: async () => {
        if (auth.user) {
          return redirect('/dashboard')
        }
      }
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      loader: async () => {
        if (!auth.user) {
          return redirect('/')
        }
      }
    }
  ])

  const [loaded, setLoaded] = useState(false)
  const refreshUser = async () => {
    const result = await api.getInfo()
    setLoaded(true)
    if (typeof result === 'string') {
      if (auth.user) {
        alert("Session expired!")
      }
      auth.setUser(null)
    } else {
      auth.setUser(result)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  let previousUser = null
  useEffect(() => {
    if (auth.user && previousUser === null) {
      const interval = setInterval(refreshUser, 1000 * 60);
      return () => clearInterval(interval);
    }
  }, [auth.user])

  return (
    <div className="App">
      <h2>JWT Auth Test</h2>
      <RouterProvider router={router} />
      { !loaded && <div className="loading"><h3>Loading...</h3></div> }
    </div>
  )
}

export default App
