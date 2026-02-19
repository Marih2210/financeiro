using System;
using System.Collections.Generic;
using CRUD.Controle.DataAccess.Helpers;

// Mapeamento para associar os campos do bd aos do Model 

namespace CRUD.Controle.DataAccess.Mappers
{
    internal class PessoaMapper
    {
        public IEnumerable<Model.Pessoa.Pessoa> Map(IEnumerable<dynamic> items)
        {
            var collection = new List<Model.Pessoa.Pessoa>();

            foreach (var item in items)
            {
                var pessoa = new Model.Pessoa.Pessoa();

                pessoa.Id = DbUtils.GetDynamicValueByProperty<int>(item, "id");
                pessoa.Nome = DbUtils.GetDynamicValueByProperty<string>(item, "nome", true);
                pessoa.Idade = DbUtils.GetDynamicValueByProperty<int>(item, "idade");

                collection.Add(pessoa);
            }

            return collection;
        }
    }
}