import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { PublicRouter } from "./PublicRouter"
import { useUserStore } from "../hooks/useUserStore"
import { useSelector } from "react-redux"

export const AppRouter = () => {

  //VARIABLES
  const { userInformation } = useSelector((state: any) => state.user)
  
  //TEMPLATE
  return (
    <Routes>
      {
        userInformation === null
          ? <Route path="auth/*" element={<PublicRouter />} />
          : <Route path="/*" element={<CalendarPage />} />
      }

      <Route path="/*" element={ <Navigate to="/auth/login" />} />

    </Routes>
  )
}
