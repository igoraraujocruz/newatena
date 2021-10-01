import { useCallback, useRef, ChangeEvent, useState } from 'react';
import { Form } from './styles';
import Button from '../Button';
import { useUpload } from '../../hooks/useUpload';
import Input from '../Input';
import {Order} from '../../interfaces/Order';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/useAuth';


interface UploadOrderProps {
  currentOrder: Order;
}

interface UploadFormData {
  name: string;
  file: File;
  order_id: string;
  message: string;
}


export function OrderUpload({currentOrder}: UploadOrderProps) {

  const {GetUploadById, createUpload, uploads} = useUpload();
  const { user } = useAuth()
  const [file, setFile] = useState({} as File);

  GetUploadById(currentOrder.id)

  const formRef = useRef<FormHandles>(null);

   const handleCreateNewUpload = useCallback(
    async (data: UploadFormData) => {

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('É necessário informar o nome do arquivo'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        createUpload({
          file: file,
          name: data.name,
          message: data.message,
          order_id: currentOrder.id,
          user_id: user.id,
        })

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors =  getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [createUpload, currentOrder, user, file],
  );

  const handleFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        setFile(file)
      }
    },
    [],
  );

    return (
            <Form ref={formRef} onSubmit={handleCreateNewUpload}>   
                <span>Arquivos anexados:</span>
                {uploads.length === 0 && <p>Nenhum documento anexado até o momento...</p>}
                {uploads.map(upload => <a href={upload.url} key={upload.id} target="blank">{upload.name}<li>{upload.message}</li></a>)}
                <input
                data-testid="input-file"
                type="file"
                id="file"
                onChange={handleFile}
                />
                <section>
                  <Input
                  name="name"
                  type='text'
                  placeholder="Insira um nome para o arquivo que deseja enviar"
                  />
                </section>         
                <Input
                  name="message"
                  type="textarea"
                  placeholder="Insira um nome para o arquivo que deseja enviar"
                  />
                <Button type="submit">Enviar Arquivo</Button>
            </Form>    
    )
}
