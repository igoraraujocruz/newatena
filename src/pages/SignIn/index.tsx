import React, { useRef, useCallback } from 'react';
import {FiUser, FiLock} from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Container, Logo } from './style'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import atena from '../../assets/atena.png'

interface SignInFormData {
  username: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          username: Yup.string().required('Nome de usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória')
      });

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn({
          username: data.username,
          password: data.password,
        });

        history.push('/');
      
      } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors =  getValidationErrors(err);
            formRef.current?.setErrors(errors);
          }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Logo>
        <img src={atena} alt="atena" />
      </Logo>
      <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="username" icon={FiUser} type="text" placeholder="Usuário"/>
          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
          <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};