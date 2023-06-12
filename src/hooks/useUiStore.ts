import { useSelector, useDispatch } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store'

export const useUiStore = () => {

  //VARIALBES
  const dispatch = useDispatch()
  const { isDateModalOpen } = useSelector((state: any) => state.ui)

  //EVENTS
  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
  }

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal
  }
}