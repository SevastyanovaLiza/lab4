import Admin from "../pages/admin";
import Authorizaton from "../pages/authorization";
import Basket from "../pages/basket";
import DevicePage from "../pages/devicePage";
import Main from "../pages/main";
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "./consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRouter = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: LOGIN_ROUTE,
        Component: Authorizaton
    }, 
    {
        path: REGISTRATION_ROUTE,
        Component: Authorizaton
    }
]