import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/Theme';
import { ImSpinner3 } from 'react-icons/im';
import { resetPassword, verifyPasswordResetToken } from '../../api/auth';
import { useNotification } from '../../hooks';

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    password: '',
    comfirmPassword: '',
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  //isValid, isVerifying, !isValid

  useEffect(() => {
    isValidToken();
    // eslint-disable-next-line
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate('/auth/reset-password', { replace: true });
      return updateNotification('error', error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate('/auth/reset-password', { replace: true });
    }

    setIsValid(true);
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please Wait we are verifying your Token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">Sorry the token is invalid!</h1>
        </Container>
      </FormContainer>
    );

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidPassword = {
      // eslint-disable-next-line
      capital: /(?=.*[A-Z])/,
      // eslint-disable-next-line
      length: /(?=.{8,20}$)/,
      // eslint-disable-next-line
      specialChar: /[ -\/:-@\[-\`{-~]/,
      // eslint-disable-next-line
      digit: /(?=.*[0-9])/,
    };

    if (!password.password.trim()) return updateNotification('error', 'Password is missing');
    if (!isValidPassword.capital.test(password.password))
      return updateNotification('error', 'Password is at least one capital characters!');
    if (!isValidPassword.length.test(password.password))
      return updateNotification('error', 'Password must be between 8 to 20 characters long!');
    if (!isValidPassword.specialChar.test(password.password))
      return updateNotification('error', 'Password is at least one symbol!');
    if (!isValidPassword.digit.test(password.password))
      return updateNotification('error', 'Password is at least one number!');

    if (!password.comfirmPassword.trim()) return updateNotification('error', 'Confirm Password is missing!');
    if (password.password !== password.comfirmPassword) return updateNotification('error', 'Password dont match');

    const { error, message } = await resetPassword({
      newPassword: password.password,
      userId: id,
      token,
    });

    if (error) return updateNotification('error', error);

    updateNotification('success', message);
    navigate('/auth/signin', { replace: true });
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClass + ' w-96'}>
          <Title>Enter New Password</Title>
          <FormInput
            value={password.password}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormInput
            value={password.comfirmPassword}
            onChange={handleChange}
            label="Comfirm Password"
            placeholder="********"
            name="comfirmPassword"
            type="password"
          />
          <Submit value="Comfirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
