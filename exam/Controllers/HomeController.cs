using System;
using System.Collections.Generic;
using exam.models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace exam.Controllers
{

    public class HomeController : Controller

    {
        //JSON FILE PATH
        private MoviesController api = new MoviesController();
        private static readonly string[] Categories = new[]
       {
            //list of movies categories, it's a static const variable.
            "Action", "Animation", "Comedy", "Crime", "Drama", "Experimental", "Romance", "Other", "Horror", "Fantasy"
        };

        [HttpPost]
        public void AddMovie( [FromBody] Movie Movie)
        {
            api.Post(Movie);
        }

        [HttpGet]
        
        public List<Category> GetCategories()
        {
            var sessionName = new Byte[20];
            //Checking if there's a session storeage with the keyvalue of categories
            if (HttpContext.Session.TryGetValue("categories", out sessionName))
            {
                //if session storeage exists then deserialize it to list of catories
                return  JsonConvert.DeserializeObject<List<Category>>(HttpContext.Session.GetString("categories"));
            }
            var categoriesTemp = new List<Category>();

                for (int i = 0; i < Categories.Length; i++)
                {
                    Category c = new Category() { Id = (i + 1), Name = Categories.GetValue(i).ToString() };

                    categoriesTemp.Add(c);
                }
                // if it's the first time reaching to the method, the data will be stored as JSON in session storeage.
            HttpContext.Session.SetString("categories", JsonConvert.SerializeObject(categoriesTemp));

                return categoriesTemp;
            
         
        }

        [HttpGet]
        public List<Movie> GetMovies()
        {
            return api.Get();
        }


    }
}
