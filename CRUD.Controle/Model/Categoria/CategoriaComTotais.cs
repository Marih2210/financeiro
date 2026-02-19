using System.Runtime.Serialization;

// Model Categoria com totais

namespace CRUD.Controle.Model.Categoria;

[DataContract]
public class CategoriaComTotais : Categoria
{
    [DataMember(Name = "totalReceitas")]
    public decimal TotalReceitas { get; set; }

    [DataMember(Name = "totalDespesas")]
    public decimal TotalDespesas { get; set; }

    [DataMember(Name = "saldo")]
    public decimal Saldo => TotalReceitas - TotalDespesas;
}

[DataContract]
public class TotaisCategorias
{
    [DataMember(Name = "totalReceitas")]
    public decimal TotalReceitas { get; set; }

    [DataMember(Name = "totalDespesas")]
    public decimal TotalDespesas { get; set; }

    [DataMember(Name = "saldoLiquido")]
    public decimal SaldoLiquido => TotalReceitas - TotalDespesas;

    [DataMember(Name = "quantidadeCategorias")]
    public int QuantidadeCategorias { get; set; }
}