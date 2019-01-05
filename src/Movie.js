import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import './Movie.css';

// smart (class 컴포넌트) this 필요, state 있음
// class Movie extends Component{

//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         poster: PropTypes.string.isRequired,
//     }

//     render() {
//         return (
//             <article>
//                 <MoviePoster poster={this.props.poster}/>
//                 <h1>{this.props.title} <mark>{this.props.rate}</mark></h1>
//             </article>
//         )
//     }
// }

// class MoviePoster extends Component{
//     static propTypes = {
//         poster: PropTypes.string.isRequired
//     }
//     render() {
//         return(
//             <img src={this.props.poster} alt="1" /> 
//         )
//     }
// }

//dumb (functional 컴포넌트) this 불필요 state 없음 (업데이트 불가) 간단할때 사용해도 무방.
function Movie({title,poster,genres,synopsis}){
    return (
        <section className="Movie">
        <div className="Movie__Column Movie__poster">
            <MoviePoster poster={poster} alt={title}/>
        </div>
        <div className="Movie__Column">
            <h1>{title}</h1>
            <mark className="Movie__Genres">
              {genres.map((genre, index) => <MovieGenre genre={genre} key={index}/>)}
            </mark>
            <div className="Movie__Synposis">
                <LinesEllipsis
                text={synopsis}
                maxLine='3'
                ellipsis='...'
                trimRight
                basedOn='letters'
                />
            </div>
        </div>
    </section>
    )
}
function MoviePoster({poster, alt}){
    return (
        <img src={poster} alt={alt} title={alt} className="Movie__Poster" /> 
    )
}

function MovieGenre({genre}){
    return (
        <span className="Movie__Genre">{genre} </span>
    )
}

Movie.prototypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired
}

MoviePoster.prototypes = {
    poster: PropTypes.string.isRequired
}

MovieGenre.prototypes={
    genre: PropTypes.string.isRequired
}

export default Movie;