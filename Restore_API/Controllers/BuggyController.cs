using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Restore_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        [Route("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        [Route("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails {Title="This is a bad request"});
        }
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpGet]
        [Route("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet]
        [Route("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("problem1", "this is first error");
            ModelState.AddModelError("problem2","this is second error");
            return ValidationProblem();
        }
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet]
        [Route("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server Error");
        }
    }
}
