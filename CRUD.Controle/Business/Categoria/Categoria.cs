namespace CRUD.Controle.Business.Categoria
{
    public class Categoria
    {
        public List<Model.Categoria.Categoria> GetAll()
        {
            using (var data = new DataAccess.Categoria.Categoria())
            {
                return data.GetAll();
            }
        }

        public int InsertCategoria(Model.Categoria.Categoria categoria)
        {
            using (var data = new DataAccess.Categoria.Categoria())
            {
                return data.Insert(categoria);
            }
        }

        public int UpdateCategoria(Model.Categoria.Categoria categoria)
        {
            using (var data = new DataAccess.Categoria.Categoria())
            {
                return data.Update(categoria);
            }
        }

        public int DeleteCategoria(int id)
        {
            using (var data = new DataAccess.Categoria.Categoria())
            {
                return data.Delete(id);
            }
        }
    }
}
