import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import FormContainer from '../form/FormContainer';
import { commonModalClass } from '../../utils/Theme';
import { ImSpinner3 } from 'react-icons/im';

export default function ConfirmPassword() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  //isValid, isVerifying, !isValid

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
