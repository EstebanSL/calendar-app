import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { useUserStore } from '../../hooks/useUserStore';
import { useForm } from 'react-hook-form';
import { AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../../services/supabaseClient';
import { errorAlert, successAlert } from '../../utils/alerts';
import { RegisterData } from '../interfaces';

export const RegisterPage = () => {

  //VARIABLES
  const navigate = useNavigate();
  const { setUserInformation } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();


  //FUNCTIONS

  /**
   * [onSubmit]
   * @param authData 
   * @returns {Promise<void>}
   */
  const onSubmit = async (authData: RegisterData): Promise<void> => {
    const { data, error }: AuthResponse = await supabase.auth.signUp(authData);
    if (error) {
      errorAlert(error.name, error.message)
    } else {
      setUserInformation(data.session);
      successAlert('Welcome', 'Registered and Signed in successfully')
    }
  };

  /**
   * [goToLogin]
   * @returns {void}
   */
  const goToLogin = () => {
    navigate('/auth/login');
  };

  //TEMPLATE
  return (
    <div className="register-container">
      <div className="register-container__image"></div>
      <h1 className="register-container__title">Calendar App</h1>
      <div className="col-md-6 register-form-1 register-formCont">
        <h3 className="register-container__subtitle">Sign Up</h3>
        <form
          className="register-container__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control py-4"
              placeholder="Email"
              {...register('email', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              })}
            />
            {errors.email && (
              <p className="text-danger mt-1 mb-4">{errors.email.message?.toString()}</p>
              )}
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control py-4"
              placeholder="Password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-danger mt-1 mb-4">{errors.password.message?.toString()}</p>
            )}
          </div>
          <div className="form-group text-center mt-4">
            <input type="submit" className="btnSubmit" value="Register" />
          </div>
        </form>

        <p className='register-formCont__link' onClick={() => goToLogin()}>Already have an account? Sign in here</p>
      </div>
    </div>
  );
};
