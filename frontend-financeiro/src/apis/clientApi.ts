import axios from 'axios'; // --> Import da biblioteca do axios para fazer as requisições HTTP

// Realizar a conexão com a porta da API do backend

export const api = axios.create({
    baseURL: 'http://localhost:5006/api',
    headers: {
        'Content-Type': 'application/json',
    },
});