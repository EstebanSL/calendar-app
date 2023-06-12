import { useForm } from 'react-hook-form';
import './LoginPage.css';
import { useUserStore } from '../../hooks/useUserStore';
import { supabase } from '../../services/supabaseClient';
import { AuthTokenResponse } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { errorAlert, successAlert } from '../../utils/alerts';
import { loginData } from '../interfaces';

export const LoginPage = () => {

  //VARIABLES
  const navigate = useNavigate();
  const { setUserInformation } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();


  //FUNCTIONS

  /**
   * [goToRegister]
   * @returns {Promise<void>}
   */
  const onSubmit = async (authData: loginData): Promise<void> => {

    const { data, error }: AuthTokenResponse =
      await supabase.auth.signInWithPassword(authData);

    if (error) {
      errorAlert('Error', error.message)
    } else {
      setUserInformation(data.session);
      successAlert('Welcome', 'Signed in successfully')
    }
  };

  /**
   * [goToRegister]
   * @returns {void}
   */
  const goToRegister = (): void => {
    navigate('/auth/register');
  };

  //TEMPLATE
  return (
    <div className="login-container">
      <div className="login-container__image"></div>
      <h1 className="login-container__title">Calendar App</h1>
      <div className="col-md-6 login-form-1 login-formCont">
        <h3 className="login-container__subtitle">Sign In</h3>
        <form
          className="login-container__form"
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
              <p className="text-danger mt-1 mb-4">
                {errors.email.message?.toString()}
              </p>
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
              <p className="text-danger mt-1 mb-4">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>
          <div className="form-group text-center mt-4">
            <input type="submit" className="btnSubmit" value="Login" />
          </div>
        </form>

        <p className='login-formCont__link' onClick={() => goToRegister()}>
          Don´t have an account? Create an account here
        </p>
      </div>
    </div>
  );
};
