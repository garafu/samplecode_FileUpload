namespace WebApplication.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using System.Web.Http;

    public class FileController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public async Task<HttpResponseMessage> Post(bool overwrite = false)
        {
            var tempPath = Path.GetTempPath();
            var provider = new MultipartFormDataStreamProvider(tempPath);

            await this.Request.Content.ReadAsMultipartAsync(provider);

            foreach (var file in provider.FileData)
            {
                // アップロードファイル名の取得
                var fileName = file.Headers.ContentDisposition.FileName;
                fileName = fileName.StartsWith("\"") || fileName.StartsWith("'") ? fileName.Substring(1, fileName.Length - 1) : fileName;
                fileName = fileName.EndsWith("\"") || fileName.EndsWith("'") ? fileName.Substring(0, fileName.Length - 1) : fileName;
                fileName = Path.GetFileName(fileName);

                // ファイルの移動
                try
                {
                    File.Move(file.LocalFileName, Path.Combine("D:\\", fileName));
                }
                catch (Exception exception)
                {
                    return this.Request.CreateResponse(HttpStatusCode.OK, new { Message = exception.Message });
                }
            }

            return this.Request.CreateResponse(HttpStatusCode.OK);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}