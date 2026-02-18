using Microsoft.AspNetCore.Mvc;
using CRUD.Controle.Business.Categoria;
using CRUD.Controle.Model.Categoria;
using CRUD.Controle.Model.Result;
using CRUD.Controle.Model.Enum;

namespace CRUD.Controle.Services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly Business.Categoria.Categoria _categoriaBusiness;

        public CategoriaController()
        {
            _categoriaBusiness = new Business.Categoria.Categoria();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = new Result<List<Model.Categoria.Categoria>>();

            try
            {
                result.Item = _categoriaBusiness.GetAll();
                result.setMessage("Categorias recuperadas com sucesso.", ErrorType.Success);
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpPost]
        public IActionResult Insert([FromBody] Model.Categoria.Categoria categoria)
        {
            var result = new Result<int>();

            try
            {
                result.Item = _categoriaBusiness.InsertCategoria(categoria);
                result.setMessage("Categoria inserida com sucesso.", ErrorType.Success);
                return Created($"/api/categoria/{result.Item}", result);
            }
            catch (Exception ex)
            {
                result.setMessage(ex.Message, ErrorType.Error);
                return BadRequest(result);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Model.Categoria.Categoria categoria)
        {
            var result = new Result<int>();

            try
            {
                categoria.Id = id;
                result.Item = _categoriaBusiness.UpdateCategoria(categoria);

                if (result.Item == 0)
                {
                    result.setMessage($"Categoria {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Categoria atualizada com sucesso.", ErrorType.Success);
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
                result.Item = _categoriaBusiness.DeleteCategoria(id);

                if (result.Item == 0)
                {
                    result.setMessage($"Categoria {id} não encontrada.", ErrorType.Warning);
                    return NotFound(result);
                }

                result.setMessage("Categoria removida com sucesso.", ErrorType.Success);
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