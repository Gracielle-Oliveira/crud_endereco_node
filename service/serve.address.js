const express = require('express');
const app = express();
app.use(express.json());

// Dados de exemplo
let clientes = [
  { codigo: 1, nome: 'Cliente 1', endereco: 1 },
  { codigo: 2, nome: 'Cliente 2', endereco: 2 },
  { codigo: 3, nome: 'Cliente 3', endereco: 1 }
];

let enderecos = [
  { id: 1, logradouro: 'Rua A', cidade: 'São Paulo', estado: 'SP' },
  { id: 2, logradouro: 'Rua B', cidade: 'Rio de Janeiro', estado: 'RJ' }
];

// Rota POST para adicionar um novo cliente
app.post('/cliente', (req, res) => {
  const cliente = req.body;
  clientes.push(cliente);
  res.status(201).json(cliente);
});

// Rota GET para obter um cliente pelo código do endereço
app.get('/cliente/:endereco', (req, res) => {
  const endereco = parseInt(req.params.endereco);
  const cliente = clientes.find(cliente => cliente.endereco === endereco);

  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  res.json(cliente);
});

// Rota GET para obter um cliente pelo código e índice
app.get('/cliente/:codigo/:indice', (req, res) => {
  const codigo = parseInt(req.params.codigo);
  const indice = parseInt(req.params.indice);
  const cliente = clientes.find(cliente => cliente.codigo === codigo);

  if (!cliente) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }

  const enderecoId = cliente.endereco;
  const endereco = enderecos.find(endereco => endereco.id === enderecoId);

  if (!endereco) {
    return res.status(404).json({ error: 'Endereço não encontrado' });
  }

  res.json({
    cliente,
    endereco
  });
});

// Rota GET para obter o endereço do cliente por cidade
app.get('/endereco', (req, res) => {
  const cidade = req.query.cidade;
  const enderecosPorCidade = enderecos.filter(endereco => endereco.cidade === cidade);
  res.json(enderecosPorCidade);
});

// Iniciar o servidor na porta 3030
app.listen(3030, () => {
  console.log('API rodando em http://localhost:3030');
});
