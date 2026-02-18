using System;
using System.Runtime.Serialization;

namespace CRUD.Controle.Model.Transacoes
{
    [DataContract]
    public class Transacoes
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "descricao")]
        public string Descricao { get; set; }

        [DataMember(Name = "valor")]
        public decimal Valor { get; set; }

        [DataMember(Name = "tipo")]
        public string Tipo { get; set; }

        [DataMember(Name = "categoriaId")]
        public int CategoriaId { get; set; }

        [DataMember(Name = "pessoaId")]
        public int PessoaId { get; set; }
    }
}