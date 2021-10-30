import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
           products: [],
        }

        this.getData = this.getData.bind(this);
    }


    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    async getData() {
        const requestOptions = {
                method: "GET",
                headers: {
                "X-CSRFToken": this.getCookie("crsftoken"),
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        };


        const response = await fetch('api/add-product', requestOptions);
        const products = await response.json();

        this.setState({
           products: products
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        const options = this.state.products.map((option) => {

            // const firstLetter = option.category;
            // return {
            //      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            //      ...option,
            // };
            return option;
        });

        return (
       <Autocomplete
        id="grouped-demo"
        options={options.sort((a, b) => -b.category.localeCompare(a.category))}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search..." variant="outlined" size="normal" />}
      />
    );
    }

};



// const products = [
//   { productName: 'The Shawshank Redemption', year: 1994 },
//   { productName: 'The Godfather', year: 1972 },
//   { productName: 'The Godfather: Part II', year: 1974 },
//   { productName: 'The Dark Knight', year: 2008 },
//   { productName: '12 Angry Men', year: 1957 },
//   { productName: "Schindler's List", year: 1993 },
//   { productName: 'Pulp Fiction', year: 1994 },
//   {
//     productName: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   },
//   { productName: 'The Good, the Bad and the Ugly', year: 1966 },
//   { productName: 'Fight Club', year: 1999 },
//   {
//     productName: 'The Lord of the Rings: The Fellowship of the Ring',
//     year: 2001,
//   },
//   {
//     productName: 'Star Wars: Episode V - The Empire Strikes Back',
//     year: 1980,
//   },
//   { productName: 'Forrest Gump', year: 1994 },
//   { productName: 'Inception', year: 2010 },
//   {
//     productName: 'The Lord of the Rings: The Two Towers',
//     year: 2002,
//   },
//   { productName: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { productName: 'Goodfellas', year: 1990 },
//   { productName: 'The Matrix', year: 1999 },
//   { productName: 'Seven Samurai', year: 1954 },
//   {
//     productName: 'Star Wars: Episode IV - A New Hope',
//     year: 1977,
//   },
//   { productName: 'City of God', year: 2002 },
//   { productName: 'Se7en', year: 1995 },
//   { productName: 'The Silence of the Lambs', year: 1991 },
//   { productName: "It's a Wonderful Life", year: 1946 },
//   { productName: 'Life Is Beautiful', year: 1997 },
//   { productName: 'The Usual Suspects', year: 1995 },
//   { productName: 'Léon: The Professional', year: 1994 },
//   { productName: 'Spirited Away', year: 2001 },
//   { productName: 'Saving Private Ryan', year: 1998 },
//   { productName: 'Once Upon a Time in the West', year: 1968 },
//   { productName: 'American History X', year: 1998 },
//   { productName: 'Interstellar', year: 2014 },
//   { productName: 'Casablanca', year: 1942 },
//   { productName: 'City Lights', year: 1931 },
//   { productName: 'Psycho', year: 1960 },
//   { productName: 'The Green Mile', year: 1999 },
//   { productName: 'The Intouchables', year: 2011 },
//   { productName: 'Modern Times', year: 1936 },
//   { productName: 'Raiders of the Lost Ark', year: 1981 },
//   { productName: 'Rear Window', year: 1954 },
//   { productName: 'The Pianist', year: 2002 },
//   { productName: 'The Departed', year: 2006 },
//   { productName: 'Terminator 2: Judgment Day', year: 1991 },
//   { productName: 'Back to the Future', year: 1985 },
//   { productName: 'Whiplash', year: 2014 },
//   { productName: 'Gladiator', year: 2000 },
//   { productName: 'Memento', year: 2000 },
//   { productName: 'The Prestige', year: 2006 },
//   { productName: 'The Lion King', year: 1994 },
//   { productName: 'Apocalypse Now', year: 1979 },
//   { productName: 'Alien', year: 1979 },
//   { productName: 'Sunset Boulevard', year: 1950 },
//   {
//     productName: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//     year: 1964,
//   },
//   { productName: 'The Great Dictator', year: 1940 },
//   { productName: 'Cinema Paradiso', year: 1988 },
//   { productName: 'The Lives of Others', year: 2006 },
//   { productName: 'Grave of the Fireflies', year: 1988 },
//   { productName: 'Paths of Glory', year: 1957 },
//   { productName: 'Django Unchained', year: 2012 },
//   { productName: 'The Shining', year: 1980 },
//   { productName: 'WALL·E', year: 2008 },
//   { productName: 'American Beauty', year: 1999 },
//   { productName: 'The Dark Knight Rises', year: 2012 },
//   { productName: 'Princess Mononoke', year: 1997 },
//   { productName: 'Aliens', year: 1986 },
//   { productName: 'Oldboy', year: 2003 },
//   { productName: 'Once Upon a Time in America', year: 1984 },
//   { productName: 'Witness for the Prosecution', year: 1957 },
//   { productName: 'Das Boot', year: 1981 },
//   { productName: 'Citizen Kane', year: 1941 },
//   { productName: 'North by Northwest', year: 1959 },
//   { productName: 'Vertigo', year: 1958 },
//   {
//     productName: 'Star Wars: Episode VI - Return of the Jedi',
//     year: 1983,
//   },
//   { productName: 'Reservoir Dogs', year: 1992 },
//   { productName: 'Braveheart', year: 1995 },
//   { productName: 'M', year: 1931 },
//   { productName: 'Requiem for a Dream', year: 2000 },
//   { productName: 'Amélie', year: 2001 },
//   { productName: 'A Clockwork Orange', year: 1971 },
//   { productName: 'Like Stars on Earth', year: 2007 },
//   { productName: 'Taxi Driver', year: 1976 },
//   { productName: 'Lawrence of Arabia', year: 1962 },
//   { productName: 'Double Indemnity', year: 1944 },
//   {
//     productName: 'Eternal Sunshine of the Spotless Mind',
//     year: 2004,
//   },
//   { productName: 'Amadeus', year: 1984 },
//   { productName: 'To Kill a Mockingbird', year: 1962 },
//   { productName: 'Toy Story 3', year: 2010 },
//   { productName: 'Logan', year: 2017 },
//   { productName: 'Full Metal Jacket', year: 1987 },
//   { productName: 'Dangal', year: 2016 },
//   { productName: 'The Sting', year: 1973 },
//   { productName: '2001: A Space Odyssey', year: 1968 },
//   { productName: "Singin' in the Rain", year: 1952 },
//   { productName: 'Toy Story', year: 1995 },
//   { productName: 'Bicycle Thieves', year: 1948 },
//   { productName: 'The Kid', year: 1921 },
//   { productName: 'Inglourious Basterds', year: 2009 },
//   { productName: 'Snatch', year: 2000 },
//   { productName: '3 Idiots', year: 2009 },
//   { productName: 'Monty Python and the Holy Grail', year: 1975 },
// ];
