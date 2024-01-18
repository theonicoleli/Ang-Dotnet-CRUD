using CrudAPI.CrudAPI.pages.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudAPI.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly Context context;

        public PersonController(Context context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> findAllPerson()
        {
            return await context.People.ToListAsync();
        }

        [HttpGet("{personId}")]
        public async Task<ActionResult<Person>> GetById(int personId)
        {
            try
            {
                Person? person = await context.People.FindAsync(personId);

                if (person == null)
                {
                    return NotFound($"Person with ID {personId} not found");
                }

                return person;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> SavePersonAsync(Person person)
        {
            try
            {
                await context.People.AddAsync(person);
                await context.SaveChangesAsync();

                return Ok("Person created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpPut("{personId}")]
        public async Task<ActionResult> EditPersonAsync(int personId, Person person)
        {
            try
            {
                if (personId != person.PersonId)
                {
                    return BadRequest("Person ID mismatch");
                }

                var existingPerson = await context.People.FindAsync(personId);

                if (existingPerson == null)
                {
                    return NotFound($"Person with ID {personId} not found");
                }

                context.Entry(existingPerson).CurrentValues.SetValues(person);
                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpDelete("{personId}")]
        public async Task<ActionResult> DeletePersonAsync(int personId)
        {
            try
            {
                Person? person = await context.People.FindAsync(personId);

                if (person == null)
                {
                    return NotFound($"Person with ID {personId} not found.");
                }

                context.People.Remove(person);
                await context.SaveChangesAsync();

                return Ok($"Person with ID {personId} has been deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}