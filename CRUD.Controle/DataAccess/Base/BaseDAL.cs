using Npgsql;
using System;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.IO;

// Classe que vai gerencia a conexão com o banco de dados PostgreSQL, 
// carregando a string de conexão do appsettings.json via construtor e 
// implementando IDisposable para garantir o fechamento da conexão corretamente.

namespace CRUD.Controle.DataAccess.Base
{
    public abstract class BaseDAL : IDisposable
    {
        protected IDbConnection? connection;
        private bool _disposed;
        protected static IConfigurationRoot _configuration;

        static BaseDAL()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();
        }

        protected string GetConnectionString()
        {
            return _configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' não encontrada.");
        }

        public void Dispose()
        {
            if (_disposed) return;

            if (connection != null && connection.State != ConnectionState.Closed)
            {
                connection.Close();
                connection.Dispose();
            }

            _disposed = true;
            GC.SuppressFinalize(this);
        }
    }
}