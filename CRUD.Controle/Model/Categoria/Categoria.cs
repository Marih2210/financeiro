using System.Runtime.Serialization;

namespace CRUD.Controle.Model.Categoria
{
    [DataContract]
    public class Categoria
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "descricao")]
        public string Descricao { get; set; }

        [DataMember(Name = "finalidade")]
        public string Finalidade { get; set; }
    }
}