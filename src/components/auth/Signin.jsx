import React, { useEffect, useState } from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { commonModalClass } from '../../utils/Theme';
import FormContainer from '../form/FormContainer';
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
// import { isValidEmail } from '../../utils/helper';

// const validateUserInfo = ({ email, password }) => {
//   // eslint-disable-next-line
//   const isValidPassword = {
//     // eslint-disable-next-line
//     capital: /(?=.*[A-Z])/,
//     // eslint-disable-next-line
//     length: /(?=.{8,20}$)/,
//     // eslint-disable-next-line
//     specialChar: /[ -\/:-@\[-\`{-~]/,
//     // eslint-disable-next-line
//     digit: /(?=.*[0-9])/,
//   };

//   if (!email.trim()) return { ok: false, error: 'Email is missing!' };
//   if (!isValidEmail(email)) return { ok: false, error: 'Invalide email!' };

//   if (!password.trim()) return { ok: false, error: 'Password is missing!' };
//   if (!isValidPassword.capital.test(password))
//     return { ok: false, error: 'Password is at least one capital characters!' };
//   if (!isValidPassword.length.test(password))
//     return { ok: false, error: 'Password must be between 8 to 20 characters long!' };
//   if (!isValidPassword.specialChar.test(password)) return { ok: false, error: 'Password is at least one symbol!' };
//   if (!isValidPassword.digit.test(password)) return { ok: false, error: 'Password is at least one number!' };

//   return { ok: true };
// };

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  // const { updateNotification } = useNotification();

  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { ok, error } = validateUserInfo(userInfo);

    // if (!ok) return updateNotification('error', error);

    handleLogin(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClass + ' w-96'}>
          <Title>Sign in</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="email"
            placeholder="test@gmail.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign in" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">ForgetPassword</CustomLink>
            <CustomLink to="/auth/signup">Signup</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
