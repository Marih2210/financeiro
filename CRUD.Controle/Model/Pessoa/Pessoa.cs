using System.Runtime.Serialization;

namespace CRUD.Controle.Model.Pessoa
{
    [DataContract]
    public class Pessoa
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "nome")]
        public string Nome { get; set; } = string.Empty;

        [DataMember(Name = "idade")]
        public int Idade { get; set; }
    }
}