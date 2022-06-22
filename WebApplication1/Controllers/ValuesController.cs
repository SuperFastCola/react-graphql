
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Features.Projects;
using WebApplication1.Models;
namespace WebApplication1.Controllers
{
    //[Authorize]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController 
    {
        Projects projects = new Projects();

        // GET api/values
        [Route("api/values")]
        public AllProjectsModel Get()
        {
            return projects.GetAll();
        }

        // GET api/values/5
        public ProjectViewModel Get(int id)
        {
            return projects.GetProject(id);
        }

        [HttpPut]
        public ProjectViewModel Put(int id, ProjectViewModel projectToUpdate)
        {
            return projects.UpdateProject(projectToUpdate);
        }

        [HttpPost]
        [Route("api/upload")]
        public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                var renamedFile = provider.FileData.First();
                var cleanedFileName = renamedFile.Headers.ContentDisposition.FileName.Trim('\"');
                string fileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"React-Frontend\public\images\", cleanedFileName);
                File.Delete(fileName); // Delete the existing file if exists
                File.Move(renamedFile.LocalFileName, fileName);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
