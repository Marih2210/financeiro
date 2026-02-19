using CRUD.Controle.DataAccess.Helpers;

// Mapeamento para associar os campos do bd aos do Model 

namespace CRUD.Controle.DataAccess.Mappers
{
    internal class TransacoesMapper
    {
        public IEnumerable<Model.Transacoes.Transacoes> Map(IEnumerable<dynamic> items)
        {
            var collection = new List<Model.Transacoes.Transacoes>();

            foreach (var item in items)
            {
                var transacao = new Model.Transacoes.Transacoes();

                transacao.Id = DbUtils.GetDynamicValueByProperty<int>(item, "id");
                transacao.Descricao = DbUtils.GetDynamicValueByProperty<string>(item, "descricao", true);  
                transacao.Valor = DbUtils.GetDynamicValueByProperty<decimal>(item, "valor");
                transacao.Tipo = DbUtils.GetDynamicValueByProperty<string>(item, "tipo", true);
                transacao.CategoriaId = DbUtils.GetDynamicValueByProperty<int>(item, "categoria_id");
                transacao.PessoaId = DbUtils.GetDynamicValueByProperty<int>(item, "pessoa_id");

                collection.Add(transacao);
            }

            return collection;
        }
    }
}
