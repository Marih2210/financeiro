using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using CRUD.Controle.DataAccess.Base;
using CRUD.Controle.DataAccess.Mappers;

namespace CRUD.Controle.DataAccess.Categoria
{
    public class Categoria : BaseDAL
    {
        public Categoria()
        {
            var connString = GetConnectionString(); 
            this.connection = new NpgsqlConnection(connString);
        }

        public List<Model.Categoria.Categoria> GetAll()
        {
            string sql = @"
                SELECT id, 
                       descricao, 
                       finalidade
                FROM financeiro.categoria 
                ORDER BY id";

            var items = this.connection.Query(sql);
            return new CategoriaMapper().Map(items).ToList();
        }

        public int Insert(Model.Categoria.Categoria categoria)
        {
            string sql = @"
                INSERT INTO financeiro.categoria (descricao, finalidade) 
                VALUES (@descricao, @finalidade)
                RETURNING id";

            return this.connection.QuerySingle<int>(sql, new
            {
                descricao = categoria.Descricao?.Trim(),
                finalidade = categoria.Finalidade?.ToLower().Trim()
            });
        }

        public int Update(Model.Categoria.Categoria categoria)
        {
            string sql = @"
                UPDATE financeiro.categoria 
                SET descricao = @descricao, 
                    finalidade = @finalidade 
                WHERE id = @id";

            return this.connection.Execute(sql, new
            {
                id = categoria.Id,
                descricao = categoria.Descricao?.Trim(),
                finalidade = categoria.Finalidade?.ToLower().Trim()
            });
        }

        public int Delete(int id)
        {
            string sql = @"DELETE FROM financeiro.categoria WHERE id = @id";
            return this.connection.Execute(sql, new { id });
        }
    }
}