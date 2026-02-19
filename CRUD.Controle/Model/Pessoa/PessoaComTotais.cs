using System.Runtime.Serialization;

// Model Pessoa com totais

namespace CRUD.Controle.Model.Pessoa;

[DataContract]
public class PessoaComTotais : Pessoa
{
    [DataMember(Name = "totalReceitas")]
    public decimal TotalReceitas { get; set; }

    [DataMember(Name = "totalDespesas")]
    public decimal TotalDespesas { get; set; }

    [DataMember(Name = "saldo")]
    public decimal Saldo => TotalReceitas - TotalDespesas;
}

[DataContract]
public class TotaisGerais
{
    [DataMember(Name = "totalReceitas")]
    public decimal TotalReceitas { get; set; }

    [DataMember(Name = "totalDespesas")]
    public decimal TotalDespesas { get; set; }

    [DataMember(Name = "saldoLiquido")]
    public decimal SaldoLiquido => TotalReceitas - TotalDespesas;

    [DataMember(Name = "quantidadePessoas")]
    public int QuantidadePessoas { get; set; }
}