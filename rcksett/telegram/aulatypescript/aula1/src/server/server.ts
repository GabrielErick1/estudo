import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for POST request to '/curse'
app.post('/curse', (req, res) => {
  const { name, description, education, duration } = req.body; 
  console.log('Received data:', req.body);

  return res.json({
    name,
    description,
    education,
    duration
  });
});


app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
