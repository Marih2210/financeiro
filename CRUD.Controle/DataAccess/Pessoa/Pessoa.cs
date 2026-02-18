using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using CRUD.Controle.DataAccess.Base;
using CRUD.Controle.DataAccess.Mappers;

namespace CRUD.Controle.DataAccess.Pessoa
{
    public class Pessoa : BaseDAL
    {
        public Pessoa()
        {
            var connString = GetConnectionString();  
            this.connection = new NpgsqlConnection(connString);
        }

        public List<Model.Pessoa.Pessoa> GetAll()
        {
            string sql = @"
                SELECT id, 
                       nome, 
                       idade
                FROM financeiro.pessoa 
                ORDER BY nome"; 

            var items = this.connection.Query(sql);
            return new PessoaMapper().Map(items).ToList();
        }

        public Model.Pessoa.Pessoa? GetById(int id)
        {
            string sql = @"
                SELECT id, 
                       nome, 
                       idade
                FROM financeiro.pessoa 
                WHERE id = @id";

            var items = this.connection.Query(sql, new { id });
            return new PessoaMapper().Map(items).FirstOrDefault();
        }

        public int Insert(Model.Pessoa.Pessoa pessoa)
        {
            string sql = @"
                INSERT INTO financeiro.pessoa (nome, idade) 
                VALUES (@nome, @idade)
                RETURNING id";

            return this.connection.QuerySingle<int>(sql, new
            {
                nome = pessoa.Nome?.Trim(),
                idade = pessoa.Idade
            });
        }

        public int Update(Model.Pessoa.Pessoa pessoa)
        {
            string sql = @"
                UPDATE financeiro.pessoa 
                SET nome = @nome, 
                    idade = @idade 
                WHERE id = @id";

            return this.connection.Execute(sql, new
            {
                id = pessoa.Id,
                nome = pessoa.Nome?.Trim(),
                idade = pessoa.Idade
            });
        }

        public int Delete(int id)
        {
            string sql = @"DELETE FROM financeiro.pessoa WHERE id = @id";
            return this.connection.Execute(sql, new { id });
        }

        public bool Exists(int id)
        {
            string sql = @"SELECT EXISTS(SELECT 1 FROM financeiro.pessoa WHERE id = @id)";
            return this.connection.ExecuteScalar<bool>(sql, new { id });
        }
    }
}