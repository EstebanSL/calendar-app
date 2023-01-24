import { useSelector, useDispatch } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store'

export const useUiStore = () => {

  const dispatch = useDispatch()

  const { isDateModalOpen } = useSelector((state: any) => state.ui)

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