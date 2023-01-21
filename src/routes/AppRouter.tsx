import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar/pages"

export const AppRouter = () => {

  const authState: string = 'non-authenticated'
  return (
    <Routes>
      {
        authState === 'non-authenticated'
          ? <Route path="auth/*" element={<LoginPage />} />
          : <Route path="/*" element={<CalendarPage />} />
      }

      <Route path="/*" element={ <Navigate to="/auth/Login" />} />

    </Routes>
  )
}
