using Microsoft.AspNetCore.Mvc;
using CRUD.Controle.Business.Transacoes;
using CRUD.Controle.Model.Transacoes;
using CRUD.Controle.Model.Result;
using CRUD.Controle.Model.Enum;

namespace CRUD.Controle.Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly Business.Transacoes.Transacoes _transacaoBusiness;

        public TransacoesController()
        {
            _transacaoBusiness = new Business.Transacoes.Transacoes();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = new Result<List<Model.Transacoes.Transacoes>>();

            try
            {
                result.Item = _transacaoBusiness.GetAll();
                result.setMessage("Transações recuperadas com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = new Result<Model.Transacoes.Transacoes>();

            try
            {
                result.Item = _transacaoBusiness.GetById(id);

                if (result.Item == null)
                {
                    result.setMessage($"Transação {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Transação recuperada com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpGet("pessoa/{pessoaId}")]
        public IActionResult GetByPessoaId(int pessoaId)
        {
            var result = new Result<List<Model.Transacoes.Transacoes>>();

            try
            {
                result.Item = _transacaoBusiness.GetByIdPessoa(pessoaId);
                result.setMessage("Transações recuperadas com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpGet("categoria/{categoriaId}")]
        public IActionResult GetByCategoriaId(int categoriaId)
        {
            var result = new Result<List<Model.Transacoes.Transacoes>>();

            try
            {
                result.Item = _transacaoBusiness.GetByCategoriaId(categoriaId);
                result.setMessage("Transações recuperadas com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpPost]
        public IActionResult Insert([FromBody] Model.Transacoes.Transacoes transacao)
        {
            var result = new Result<int>();

            try
            {
                result.Item = _transacaoBusiness.InsertTransacao(transacao);
                result.setMessage("Transação inserida com sucesso.", ErrorType.Success);
                return Created($"/api/transacao/{result.Item}", result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Model.Transacoes.Transacoes transacao)
        {
            var result = new Result<int>();

            try
            {
                transacao.Id = id;
                result.Item = _transacaoBusiness.UpdateTransacao(transacao);

                if (result.Item == 0)
                {
                    result.setMessage($"Transação {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Transação atualizada com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = new Result<int>();

            try
            {
                result.Item = _transacaoBusiness.DeleteTransacao(id);

                if (result.Item == 0)
                {
                    result.setMessage($"Transação {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Transação removida com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }
    }
}