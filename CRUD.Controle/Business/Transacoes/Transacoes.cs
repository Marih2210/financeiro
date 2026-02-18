namespace CRUD.Controle.Business.Transacoes
{
    public class Transacoes
    {
        public List<Model.Transacoes.Transacoes> GetAll()
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.GetAll();
            }
        }

        public Model.Transacoes.Transacoes GetById(int id)
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.GetById(id);
            }
        }

        public List<Model.Transacoes.Transacoes> GetByIdPessoa(int id)
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.GetByIdPessoa(id);
            }
        }

        public List<Model.Transacoes.Transacoes> GetByCategoriaId(int id)
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.GetByCategoriaId(id);
            }
        }

        public int InsertTransacao(Model.Transacoes.Transacoes transacoes)
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.Insert(transacoes);
            }
        }

        public int UpdateTransacao(Model.Transacoes.Transacoes transacoes)
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.Update(transacoes);
            }
        }

        public int DeleteTransacao(int id)
        {
            using (var data = new DataAccess.Transacoes.Transacoes())
            {
                return data.Delete(id);
            }
        }
    }
}
