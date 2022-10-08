import { useAuth } from "../auth"
import { useNavigate } from "react-router-dom"
import * as api from '../api'

export default function Dashboard() {
  const auth = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    auth.setUser(null)
    navigate('/')
    await api.logout()
    alert('Logged out!')
  }

  const deleteAccount = async () => {
    auth.setUser(null)
    navigate('/')
    await api.deleteAccount()
    alert('Account deleted!')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {auth.user?.username}!</h2>
      <p>Yes, there is basically nothing you can do here.</p>
      <div className="buttons">
        <button onClick={logout}>Logout</button>
        <button onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}
