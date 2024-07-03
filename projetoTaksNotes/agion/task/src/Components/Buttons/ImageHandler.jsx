import LZString from 'lz-string';

const ImageHandler = function(quill) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.style.display = 'block';
  input.style.margin = '20px auto';
  input.style.fontSize = '16px';
  input.style.padding = '10px';
  input.style.width = '100%';
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (/^image\//.test(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const range = quill.getSelection();
        const index = range.index;
        const base64Image = reader.result;
        const compressedImage = LZString.compressToBase64(base64Image);

        quill.insertEmbed(range.index, 'image', base64Image);

        // Salvar a imagem no estado
        quill.setSelection(index + 1);
        saveImage(compressedImage, index);
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('Por favor, selecione uma imagem.');
    }
  };
};

const saveImage = (compressedImage, index, setImages) => {
  setImages(prevImages => [...prevImages, { src: compressedImage, index }]);
};

export default ImageHandler;
