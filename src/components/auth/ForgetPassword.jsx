import React, { useState } from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/Theme';
import { forgetPassword } from '../../api/auth';
import { isValidEmail } from '../../utils/helper';
import { useNotification } from '../../hooks';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidEmail(email)) return updateNotification('error', 'Invalid Email!');
    const { error, message } = await forgetPassword(email);
    if (error) return updateNotification('error', error);
    updateNotification('success', message);
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClass + ' w-96'}>
          <Title>Please enter your Email</Title>
          <FormInput onChange={handleChange} value={email} label="email" placeholder="test@gmail.com" name="email" />
          <Submit value="Send link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Signin</CustomLink>
            <CustomLink to="/auth/signup">Signup</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
