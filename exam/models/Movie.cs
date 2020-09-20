using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace exam.models
{
    public class Movie
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public Category Category { set; get; }
        public double  Rate { set; get; }
    }
}
