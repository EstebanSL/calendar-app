import { addHours, differenceInSeconds } from 'date-fns';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

import { useCalendarStore, useUiStore } from '../../hooks';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface formValues {
  title: string;
  notes: string;
  start: Date;
  end: Date;
}

export const CalendarModal = () => {

  //VARIABLES
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setformSubmitted] = useState<boolean>(false);

  const {
    activeEvent,
    startSavingEvent,
    startDeletingEvent,
    startUpdatingEvent,
  } = useCalendarStore();

  const [formValues, setFormValues] = useState<formValues>({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  //VARIABLES

  /**
   * [handleClickDelete]
   * @returns {void}
   */
  const handleClickDelete = (): void => {
    startDeletingEvent(activeEvent);
    closeDateModal();
  };


  /**
   * [onInputChange]
   * @param {ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>} event
   * @retirns void
   */
  const onInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const titleClass = useMemo(() => {
    if (!formSubmitted) {
      return '';
    }
    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  /**
   * [onDateChange]
   * @param {Date} event
   * @param {'start' | 'end'} type 
   */
  const onDateChange = (event: Date, type: 'start' | 'end') => {
    setFormValues({
      ...formValues,
      [type]: event,
    });
  };

  /**
   * [onCloseModal]
   * @returns {void}
   */
  function onCloseModal(): void {
    closeDateModal();
  }

  /**
   * [onSubmit]
   * @param {FormEvent} event 
   * @returns {Promise<void>}
   */
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setformSubmitted(true);
    if (isValidForm()) {
      if (activeEvent.title) {
        await startUpdatingEvent(formValues);
      } else {
        await startSavingEvent(formValues);
      }

      closeDateModal();
    }
    return;
  };

  /**
   * [isValidForm]
   * @description Check the form inputs and returns the validation result
   * @returns {boolean}
   */
  const isValidForm = (): boolean => {
    const dateDifference: number = differenceInSeconds(
      formValues.end,
      formValues.start
    );
    if (isNaN(dateDifference) || dateDifference <= 0) {
      Swal.fire({
        title: 'Dates error',
        text: 'Initial date must be before end date',
        icon: 'error',
      });
      return false;
    }
    if (formValues.title.length === 0) {
      Swal.fire({
        title: 'Field error',
        text: 'Title must be provided',
        icon: 'error',
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
      setformSubmitted(false);
    }
  }, [activeEvent]);


  //TEMPLATE
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(date: Date) => onDateChange(date, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            selected={formValues.end}
            minDate={formValues.start}
            className="form-control"
            onChange={(date: Date) => onDateChange(date, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <div className="buttons">
          <button type="submit" className="btn btn-outline-primary">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>

          {activeEvent?.title && (
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={handleClickDelete}
            >
              <i className="fa-solid fa-trash"></i>
              <span> Eliminar</span>
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};
