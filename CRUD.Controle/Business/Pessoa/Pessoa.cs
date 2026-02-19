// Referência de negócios e tratamentos necessários
// aos métodos de dados de acesso de pessoas

namespace CRUD.Controle.Business.Pessoa
{
    public class Pessoa
    {
        public List<Model.Pessoa.Pessoa> GetAll()
        {
            using (var data = new DataAccess.Pessoa.Pessoa())
            {
                return data.GetAll();
            }
        }

        public Model.Pessoa.Pessoa GetById(int id)
        {
            using (var data = new DataAccess.Pessoa.Pessoa())
            {
                return data.GetById(id);
            }
        }

        public int InsertPessoa(Model.Pessoa.Pessoa pessoa)
        {
            using (var data = new DataAccess.Pessoa.Pessoa())
            {
                return data.Insert(pessoa);
            }
        }

        public int UpdatePessoa(Model.Pessoa.Pessoa pessoa)
        {
            using (var data = new DataAccess.Pessoa.Pessoa())
            {
                return data.Update(pessoa);
            }
        }

        public int DeletePessoa(int id)
        {
            using (var data = new DataAccess.Pessoa.Pessoa())
            {
                return data.Delete(id);
            }
        }
    }
}
