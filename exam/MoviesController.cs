using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using exam.models;
using System.IO;
using Newtonsoft.Json;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace exam
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {

        private string JsonFilePath = "../exam/data/movies.json";

        [HttpGet]
        public List<Movie> Get()
        {
            //Reading the movies from the movies.json object and sending it to the customer.
            var movies = new List<Movie>();
            using (StreamReader r = new StreamReader(JsonFilePath))
            {
                string json = r.ReadToEnd();

                movies = JsonConvert.DeserializeObject<List<Movie>>(json);
            }
            return movies;
        }


        [HttpPost]
        public void Post(Movie Movie)
        {

            var movies = new List<Movie>();
            var newJson = "";
            //Reading the file then adding the sent item to the new json array
            using (StreamReader r = new StreamReader(JsonFilePath))
            {
                string json = r.ReadToEnd();

                movies = JsonConvert.DeserializeObject<List<Movie>>(json);
                movies.Add(Movie);
                newJson = JsonConvert.SerializeObject(movies, Formatting.Indented);

            }
            //re-writing the file with the previous data + the new item
            System.IO.File.WriteAllText(JsonFilePath, newJson);

        }
    }
}
