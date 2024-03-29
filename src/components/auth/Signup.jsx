import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/auth';
import { commonModalClass } from '../../utils/Theme';
import Container from '../Container';
import FormContainer from '../form/FormContainer';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Title from '../form/Title';
import Submit from '../form/Submit';
import { useAuth, useNotification } from '../../hooks';
import { isValidEmail } from '../../utils/helper';

const validateUserInfo = ({ name, email, password, rePassword }) => {
  // eslint-disable-next-line
  const isValidName = /^[a-z A-Z]+$/;
  // eslint-disable-next-line
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

  if (!name.trim()) return { ok: false, error: 'Name is missing' };
  if (!isValidName.test(name)) return { ok: false, error: 'Invalide name!' };

  if (!email.trim()) return { ok: false, error: 'Email is missing!' };
  if (!isValidEmail(email)) return { ok: false, error: 'Invalide email!' };

  if (!password.trim()) return { ok: false, error: 'Password is missing!' };
  if (!isValidPassword.capital.test(password))
    return { ok: false, error: 'Password is at least one capital characters!' };
  if (!isValidPassword.length.test(password))
    return { ok: false, error: 'Password must be between 8 to 20 characters long!' };
  if (!isValidPassword.specialChar.test(password)) return { ok: false, error: 'Password is at least one symbol!' };
  if (!isValidPassword.digit.test(password)) return { ok: false, error: 'Password is at least one number!' };

  if (!rePassword.trim()) return { ok: false, error: 'Repeat Password is missing!' };
  if (rePassword.trim() !== password.trim()) return { ok: false, error: 'Repeat password is not right!' };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();

  const { name, email, password, rePassword } = userInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification('error', error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);

    navigate('/auth/verification', {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClass + ' w-96'}>
          <Title>Sign up</Title>
          <FormInput value={name} onChange={handleChange} label="Name" placeholder="Your Name..." name="name" />
          <FormInput value={email} onChange={handleChange} label="email" placeholder="test@gmail.com" name="email" />
          <FormInput
            value={password}
            onChange={handleChange}
            label="password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormInput
            value={rePassword}
            onChange={handleChange}
            label="Comfirm Password"
            placeholder="********"
            name="rePassword"
            type="password"
          />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">ForgetPassword</CustomLink>
            <CustomLink to="/auth/signin">Signin</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
