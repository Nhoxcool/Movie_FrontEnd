import React from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';

export default function Signup() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Sign up</Title>
          <FormInput label="Name" placeholder="Your Name..." name="name" />
          <FormInput label="email" placeholder="test@gmail.com" name="email" />
          <FormInput label="password" placeholder="********" name="password" type="password" />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">ForgetPassword</CustomLink>
            <CustomLink to="/auth/signin">Signin</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
