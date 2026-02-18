import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { CategoriaPage } from '../pages/Categoria';
import { PessoaPage } from '../pages/Pessoa';
import { TransacaoPage } from '../pages/Transacoes';
import { NovaTransacaoPage } from '../pages/NovaTransacao';
import { PessoaTotaisPage } from '../pages/PessoaTotais';
import { CategoriaTotais } from "../pages/CategoriaTotais";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/categorias',
        element: <CategoriaPage />,
    },
     {
        path: '/categorias/totais',
        element: <CategoriaTotais />,
    },
    {
        path: '/pessoas',
        element: <PessoaPage />,
    },
    {
        path: '/pessoas/totais',
        element: <PessoaTotaisPage />,
    },
    {
        path: '/transacoes',
        element: <TransacaoPage />,
    },
    {
        path: '/transacoes/nova',
        element: <NovaTransacaoPage />,
    },
]);

export const AppRoutes = () => <RouterProvider router={router} />;