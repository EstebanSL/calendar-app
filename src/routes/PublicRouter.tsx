import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { RegisterPage } from '../auth/pages/RegisterPage';

export const PublicRouter = () => {
  const authState: string = 'non-authenticated';
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
