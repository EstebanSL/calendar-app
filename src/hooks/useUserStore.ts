import { useSelector, useDispatch } from 'react-redux'
import { deleteUserData, setUserData } from '../store'

export const useUserStore = () => {

  //VARIABLES
  const dispatch = useDispatch()

  //EVENTS
  const setUserInformation = (data: any) => {
    dispatch(setUserData(data))
  }

  const clearUserInformation = () => {
    dispatch(deleteUserData())
  }

  return {
    clearUserInformation,
    setUserInformation
  }
}