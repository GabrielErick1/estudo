import React, { useState } from "react";
import { Editor } from "primereact/editor"; // Verifique se o caminho está correto

export default function BasicDemo() {
  const [text, setText] = useState('');

  return (
    <div className="card">
      <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
    </div>
  );
}
