import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const DashLayout = () => {
    return (
        <div className='min-h-dvh'>
            <Navigation />
            <div className="w-full h-full p-4">
                <Outlet />
            </div>
        </div>
    )
}
export default DashLayout