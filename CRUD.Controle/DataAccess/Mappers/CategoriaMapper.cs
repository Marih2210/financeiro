using System;
using System.Collections.Generic;
using CRUD.Controle.DataAccess.Helpers;

// Mapeamento para associar os campos do bd aos do Model 

namespace CRUD.Controle.DataAccess.Mappers
{
    internal class CategoriaMapper
    {
        public IEnumerable<Model.Categoria.Categoria> Map(IEnumerable<dynamic> items)
        {
            var collection = new List<Model.Categoria.Categoria>();

            foreach (var item in items)
            {
                var categoria = new Model.Categoria.Categoria();

                categoria.Id = DbUtils.GetDynamicValueByProperty<int>(item, "id");
                categoria.Descricao = DbUtils.GetDynamicValueByProperty<string>(item, "descricao", true); 
                categoria.Finalidade = DbUtils.GetDynamicValueByProperty<string>(item, "finalidade", true);  

                collection.Add(categoria);
            }

            return collection;
        }
    }
}
