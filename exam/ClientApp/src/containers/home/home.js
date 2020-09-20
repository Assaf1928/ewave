import React,{Component} from 'react';
import classes from './home.module.css';
import MovieItem from '../../components/moveItem/movieItem'
import {Form,Jumbotron} from 'react-bootstrap'
import Modal from '../../components/modal/modal'
import axios from 'axios'
class Home extends Component {
    state = {
        categories: [],
        CategoriesFilter: 0,
        movies: [],
        modalShow: false,
        Rate: 50,
        Name: '',
        Category: 0
    }

    componentDidMount() {

        //Fetching Categories
        let url = `Home/GetCategories`

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(data => {

                this.setState({

                    categories: JSON.parse(data)
                })
              
            })
            .catch((error) => {

                console.error('Error:', error);
            });



        //Fetching Movies

        url ='Home/GetMovies'

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(data => {
                this.setState({
                    ...this.state,
                    movies: JSON.parse(data)
                })


            })
            .catch((error) => {

                console.error('Error:', error);
            });

    }
         

    //modal close/show functions

    handleModalClose = () => {
        this.setState({modalShow:false})
    }

    handleModalShow = () => {
        this.setState({ modalShow: true })
    }

    handleChange = e => {
        //OnChange stores elements value  into state by the element name.
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)

    };

    
    addMovie = () => {

        const moviesTemp = this.state.movies;
        const new_Name = this.state.Name;

        //Validation --> Checking if the customer chose category or name
        if (new_Name == '' || this.state.Category == 0) {
            alert("Please fill all the fields")
            return;
        }
        //Finding the category name by it's Id.
        const catName = this.state.categories.find(cat => cat.id == this.state.Category);
        //Declaring a new variable with the relevant Id
        const new_Id = this.state.movies.length + 1;
        //Creating a new Movie object
        const new_movie = {
            id: new_Id,
            category: { id: parseInt(this.state.Category), name: catName.name },
            name: new_Name,
            rate: parseFloat(this.state.Rate / 10).toFixed(1)

        }

        // pushing the object to the state movies array
        moviesTemp.push(new_movie)
        console.log(new_movie)
        this.setState({
            ...this.state,
            movies: moviesTemp,
        })


        this.handleModalClose();


        //this ajax request will send 'movie' object to the server and store it inside the json file.

     
        fetch('Home/AddMovie', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;",
            },
            body: JSON.stringify({
                Id: new_movie.id,
                Name: new_movie.name,
                Category: {
                    Id: parseInt(new_movie.category.id),
                    Name: new_movie.category.name
                },
                Rate: parseFloat(new_movie.rate)

            })

        }).then(res => res.text())         
            .then(text => {

            })  

            .catch((error) => {

                console.error('Error:', error);
            });

    }
    
    render() {
        //Storing all the categories into a variable
        let Categories = '';
        let CategoriesData = this.state.categories;
        if (CategoriesData.length != 0) {
            Categories = CategoriesData.map((cat) => {
                return <option key={cat.id} value={cat.id}>{cat.name}</option> })
        
        }

        //Storing all top 10 movies into a variable

        //checking the current category filter status (if there's a value the movies will be filtered)
        const category_filter = this.state.CategoriesFilter;

        let Movies = '';
        let MoviesData = this.state.movies;
        if (MoviesData.length != 0) {
        //sorting by rate ( biggest to smallest)
        MoviesData = this.state.movies.sort((a, b) => b.rate - a.rate)

        //filtering by category if there's a customer filtering.
        if (category_filter != 0) {
            MoviesData = MoviesData.filter(movie => movie.category.id == category_filter)
        }
        
        //Looping the movies array and storing the data inside MovieItem component
            Movies = MoviesData.map((movie,index) => {
                if (index <= 9)
                    return <MovieItem key={index} id={index} movie={movie} />   
            })


        }

    return (
        <div>

        <Jumbotron style={{margin: '50px'}}>
        <h1>Top 10 movies</h1>
        <p>
            this site presents top ten movies according to ABC company rate.
        </p>
                <Modal modalClose={this.handleModalClose} modalShow={this.handleModalShow} show={this.state.modalShow} categories={Categories} addMovie={this.addMovie} onChange={this.handleChange}/>
        </Jumbotron>

            <div className={classes.container}>
               <Form.Group  controlId="formGridState">

                    <Form.Control onChange={this.handleChange} name="CategoriesFilter" as="select" defaultValue="Choose...">
                        <option value="0">Choose Category</option>{Categories}
                 </Form.Control>
                </Form.Group>
                <div className={classes.movies_container}>
                    {Movies}
                    </div>
            </div>
        </div>

    )
}

}

export default Home;