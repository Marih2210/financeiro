using Microsoft.AspNetCore.Mvc;
using CRUD.Controle.Business.Pessoa;
using CRUD.Controle.Model.Pessoa;
using CRUD.Controle.Model.Result;
using CRUD.Controle.Model.Enum;

namespace CRUD.Controle.Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly Business.Pessoa.Pessoa _pessoaBusiness;

        public PessoaController()
        {
            _pessoaBusiness = new Business.Pessoa.Pessoa();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = new Result<List<Model.Pessoa.Pessoa>>();

            try
            {
                result.Item = _pessoaBusiness.GetAll();
                result.setMessage("Pessoas recuperadas com sucesso.", ErrorType.Success);
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
            var result = new Result<Model.Pessoa.Pessoa>();

            try
            {
                result.Item = _pessoaBusiness.GetById(id);

                if (result.Item == null)
                {
                    result.setMessage($"Pessoa {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Pessoa recuperada com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpPost]
        public IActionResult Insert([FromBody] Model.Pessoa.Pessoa pessoa)
        {
            var result = new Result<int>();

            try
            {
                result.Item = _pessoaBusiness.InsertPessoa(pessoa);
                result.setMessage("Pessoa inserida com sucesso.", ErrorType.Success);
                return Created($"/api/pessoa/{result.Item}", result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Model.Pessoa.Pessoa pessoa)
        {
            var result = new Result<int>();

            try
            {
                pessoa.Id = id;
                result.Item = _pessoaBusiness.UpdatePessoa(pessoa);

                if (result.Item == 0)
                {
                    result.setMessage($"Pessoa {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Pessoa atualizada com sucesso.", ErrorType.Success);
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
                result.Item = _pessoaBusiness.DeletePessoa(id);

                if (result.Item == 0)
                {
                    result.setMessage($"Pessoa {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Pessoa removida com sucesso.", ErrorType.Success);
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