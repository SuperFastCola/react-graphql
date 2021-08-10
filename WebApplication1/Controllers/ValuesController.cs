
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using WebApplication1.Features.Projects;
using WebApplication1.Models;
namespace WebApplication1.Controllers
{
    public class ValuesController : ApiController 
    {
        Projects projects = new Projects();

        // GET api/values
        public AllProjectsModel Get()
        {
            return projects.GetAll();
        }

        // GET api/values/5
        public ProjectViewModel Get(int id)
        {
            return projects.GetProject(id);
        }

        public ProjectViewModel Put(int id, ProjectViewModel projectToUpdate)
        {
            return projects.UpdateProject(projectToUpdate);
        }

    }
}
