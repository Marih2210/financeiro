using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using CRUD.Controle.DataAccess.Base;
using CRUD.Controle.DataAccess.Mappers;

namespace CRUD.Controle.DataAccess.Transacoes
{
    public class Transacoes : BaseDAL
    {
        public Transacoes()
        {
            var connString = GetConnectionString();  
            this.connection = new NpgsqlConnection(connString);
        }

        public List<Model.Transacoes.Transacoes> GetAll() 
        {
            string sql = @"
                SELECT id, 
                       descricao, 
                       valor, 
                       tipo, 
                       categoria_id, 
                       pessoa_id
                FROM financeiro.transacoes 
                ORDER BY id DESC";  

            var items = this.connection.Query(sql);
            return new TransacoesMapper().Map(items).ToList();  
        }

        public Model.Transacoes.Transacoes? GetById(int id)  
        {
            string sql = @"
                SELECT id, 
                       descricao, 
                       valor, 
                       tipo, 
                       categoria_id, 
                       pessoa_id
                FROM financeiro.transacoes 
                WHERE id = @id";

            var items = this.connection.Query(sql, new { id });
            return new TransacoesMapper().Map(items).FirstOrDefault();
        }

        public List<Model.Transacoes.Transacoes> GetByIdPessoa(int pessoaId)
        {
            string sql = @"
                SELECT id, 
                       descricao, 
                       valor, 
                       tipo, 
                       categoria_id, 
                       pessoa_id
                FROM financeiro.transacoes 
                WHERE pessoa_id = @pessoaId
                ORDER BY id DESC";

            var items = this.connection.Query(sql, new { pessoaId });
            return new TransacoesMapper().Map(items).ToList();
        }

        public List<Model.Transacoes.Transacoes> GetByCategoriaId(int categoriaId)
        {
            string sql = @"
                SELECT id, 
                       descricao, 
                       valor, 
                       tipo, 
                       categoria_id, 
                       pessoa_id
                FROM financeiro.transacoes 
                WHERE categoria_id = @categoriaId
                ORDER BY id DESC";

            var items = this.connection.Query(sql, new { categoriaId });
            return new TransacoesMapper().Map(items).ToList();
        }

        public int Insert(Model.Transacoes.Transacoes transacao)
        {
            string sql = @"
                INSERT INTO financeiro.transacoes (
                    descricao, 
                    valor, 
                    tipo, 
                    categoria_id, 
                    pessoa_id
                ) VALUES (
                    @descricao, 
                    @valor, 
                    @tipo, 
                    @categoria_id, 
                    @pessoa_id
                )
                RETURNING id";

            return this.connection.QuerySingle<int>(sql, new
            {
                descricao = transacao.Descricao?.Trim(),
                valor = transacao.Valor,
                tipo = transacao.Tipo?.ToLower().Trim(),
                categoria_id = transacao.CategoriaId,
                pessoa_id = transacao.PessoaId
            });
        }

        public int Update(Model.Transacoes.Transacoes transacao)
        {
            string sql = @"
                UPDATE financeiro.transacoes 
                SET descricao = @descricao, 
                    valor = @valor, 
                    tipo = @tipo, 
                    categoria_id = @categoria_id,
                    pessoa_id = @pessoa_id
                WHERE id = @id";

            return this.connection.Execute(sql, new
            {
                id = transacao.Id,
                descricao = transacao.Descricao?.Trim(),
                valor = transacao.Valor,
                tipo = transacao.Tipo?.ToLower().Trim(),
                categoria_id = transacao.CategoriaId,
                pessoa_id = transacao.PessoaId
            });
        }

        public int Delete(int id)
        {
            string sql = @"DELETE FROM financeiro.transacoes WHERE id = @id";
            return this.connection.Execute(sql, new { id });
        }
    }
}