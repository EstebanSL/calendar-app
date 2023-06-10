import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice } from './'
import { uiSlice } from './ui/uiSlice';
import { userSlice } from './user/userSlice' 

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})