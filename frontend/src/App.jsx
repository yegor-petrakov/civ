// React Router Dom
import { Routes, Route } from 'react-router-dom'

// My Components
import Layout from './components/Layout'
import DashLayout from './components/DashLayout'
import Home from './components/Home'
import Login from './components/auth/Login'
import RequireAuth from './components/auth/RequireAuth'
import PersistLogin from './components/auth/PersistLogin'

// Codes
import CodesList from './components/codes/CodesList'
import EditCode from './components/codes/EditCode'
import CreateCode from './components/codes/CreateCode'

// Vaults
import VaultsList from './components/vaults/VaultsList'
import EditVault from './components/vaults/EditVault'
import CreateVault from './components/vaults/CreateVault'

// Users
import UsersList from './components/users/UsersList'
import CreateUser from './components/users/CreateUser'
import EditUser from './components/users/EditUser'

// Logs
import LogsList from './components/logs/LogsList'


const ROLES = ['user', 'editor', 'admin']


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Login />} />


        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={ROLES} />}>

            <Route path="dash" element={<DashLayout />}>

              <Route index element={<Home />} />

              <Route path="codes">
                <Route index element={<CodesList />} />
                <Route path='new' element={<CreateCode />} />
                <Route path=':id' element={<EditCode />} />
              </Route>

              <Route path="vaults">
                <Route index element={<VaultsList />} />
                <Route path='new' element={<CreateVault />} />
                <Route path=':id' element={<EditVault />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES[2]]} />}>
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path='new' element={<CreateUser />} />
                  <Route path=':id' element={<EditUser />} />
                </Route>
              </Route>



              <Route path="logs">
                <Route index element={<LogsList />} />
                {/* <Route path='create' element={<NewUserForm />} />
            <Route path=':id' element={<EditUser />} /> */}
              </Route>

            </Route>
          </Route>
        </Route>



      </Route>

    </Routes >
  )
}

export default App
