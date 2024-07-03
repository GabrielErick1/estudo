import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Certifique-se de estar usando o estilo snow ou outro de sua preferência
import { modules, formats } from './quillModules';
import { Container } from './textarea'; 

function TextArea({ onChange, value, ...rest }) {
  useEffect(() => {
    const quillEditor = document.querySelector('.ql-container');
    if (quillEditor) {
      quillEditor.style.border = 'none';
    }
    const quillToolbar = document.querySelector('.ql-toolbar');
    if (quillToolbar) {
      quillToolbar.style.border = '1px solid black';
      quillToolbar.style.marginBottom = '8px';
    }
    const quillEditorArea = document.querySelector('.ql-editor');
    if (quillEditorArea) {
      quillEditorArea.style.border = 'none';
      quillEditorArea.style.boxShadow = 'none';
      quillEditorArea.style.padding = '0';
    }
  }, []);

  return (
    <Container {...rest}>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{
          height: '250px',
          width: '100%',
          marginBottom: '8px',
          border: 'none', // Remove a borda
          
          boxShadow: 'none', // Remove a sombra, se houver
          padding: 0 // Remove o padding, se necessário
        }}
      />
    </Container>
  );
}

export default TextArea;
