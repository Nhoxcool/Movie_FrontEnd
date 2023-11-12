import React from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/Theme';

export default function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClass + ' w-96'}>
          <Title>Please enter your Email</Title>
          <FormInput label="email" placeholder="test@gmail.com" name="email" />
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
