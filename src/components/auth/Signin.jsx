import React from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';

export default function Signin() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title className="text-xl text-white font-semibold text-center">Sing in</Title>
          <FormInput label="email" placeholder="test@gmail.com" name="email" />
          <FormInput label="password" placeholder="********" name="password" type="password" />
          <Submit value="Sign in" />

          <div className="flex justify-between">
            <a className="text-dark-subtle hover:text-white transition" href="#">
              Forget password
            </a>
            <a className="text-dark-subtle hover:text-white transition" href="#">
              Sign up
            </a>
          </div>
        </form>
      </Container>
    </div>
  );
}
