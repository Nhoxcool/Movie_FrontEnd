import React from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/Theme';

export default function ConfirmPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClass + ' w-96'}>
          <Title>Enter New Password</Title>
          <FormInput label="New Password" placeholder="********" name="password" type="password" />
          <FormInput label="Comfirm Password" placeholder="********" name="comfirmPassword" type="password" />
          <Submit value="Comfirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
