import React, { useState, useRef, useEffect } from 'react';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import './ckeditor.css';
import Title from '../../components/Title';
import Button from '../../components/Button';

import { Container, FormDiv, TitleDiv, FormInputs } from './styles';

function PaginaCadastro({ match }) {
  const [text, setText] = useState('');
  const [cPagina, setCPagina] = useState({});

  useEffect(() => {
    const { pagina } = match.params;

    api
      .get(`/pagina/${pagina}`)
      .then((res) => {
        const response = res.data.data[0];
        setCPagina(response);
        setText(response.pagina_conteudo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleSubmit() {
    if (!text) {
      toast.error('É necessário inserir um texto na página');
      return;
    }

    const json = {
      titulo: cPagina.pagina_nome,
      texto: text,
    };

    api
      .put(`/pagina/${cPagina.pagina_id}`, json)
      .then((res) => {
        toast.info(res.data.message);
        history.push('/paginaadm');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  function handleEditorChange(content) {
    setText(content);
  }

  return (
    <>
      <Container>
        <TitleDiv>
          <Title back="/paginaadm">{`Edição página ${cPagina.pagina_nome}`}</Title>
        </TitleDiv>
        <FormDiv>
          <FormInputs onSubmit={handleSubmit}>
            <Editor
              initialValue={text}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | image imagetools |\
                      bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={handleEditorChange}
            />
            {/* <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: 'Digite o conteudo da página',

                // toolbar: [...'ImageInsert', 'imageUpload'],
                ckfinder: {
                  uploadUrl:
                    'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                },
              }}
              data={cPagina ? cPagina.pagina_conteudo : ''}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            /> */}
            <Button type="submit">Enviar</Button>
          </FormInputs>
        </FormDiv>
      </Container>
    </>
  );
}

export default PaginaCadastro;
