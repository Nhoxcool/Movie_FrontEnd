import React from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { commonModalClass } from '../../utils/Theme';
import FormContainer from '../form/FormContainer';

export default function Signin() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClass + ' w-96'}>
          <Title>Sign in</Title>
          <FormInput label="email" placeholder="test@gmail.com" name="email" />
          <FormInput label="password" placeholder="********" name="password" type="password" />
          <Submit value="Sign in" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">ForgetPassword</CustomLink>
            <CustomLink to="/auth/signup">Signup</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
