import { BrowserRouter,Routes,Route} from "react-router"
import Login from "./features/pages/Login"
import Register from "./features/pages/Register"


function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;