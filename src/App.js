import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  //Render: componentWillMount() -> render() -> componentDidMount()
  //Update: componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       movies : [
  //         {
  //           title: "Matrix",
  //           poster: "http://ticketimage.interpark.com/Movie/still_image/V16/V1601447p_s01.gif"
  //         },
  //         {
  //           title:  "full metal Jacket",
  //           poster: "https://resizing.flixster.com/qy5z8R85IQFbL0m90PpAFtnM8k4=/206x305/v1.bTsxMTE2ODAyOTtqOzE3OTk0OzEyMDA7ODAwOzEyMDA",
  //         },
  //         {
  //           title: "Oldboy",
  //           poster: "http://fetch.rigvedawiki.net/f/wiki.php?action=fetch&url=http://movie.phinf.naver.net/20111222_177/1324537084439rmrVk_JPEG/movie_image.jpg&thumbwidth=480",
  //         },
  //         {
  //           title: "Star Wars",
  //           poster: "https://c-8oqtgrjgwu46x24koikzx2etcpmgtx2eeqo.g00.ranker.com/g00/3_c-8yyy.tcpmgt.eqo_/c-8OQTGRJGWU46x24jvvrux3ax2fx2fkoikz.tcpmgt.eqox2fwugt_pqfg_koix2f72298x2f3223733137x2fqtkikpcnx2fvjg-x78gta-hktuv-_uvct-yct_-rquvgt-rjqvq-w3x3fyx3d872x26sx3d72x26hox3dlrix26hkvx3detqrx26etqrx3dhcegux26k32e.octmx3dkocig_$/$/$/$/$/$"
  //         },
  //         {
  //           title: "ring of the lord",
  //           poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY999_CR0,0,673,999_AL_.jpg"
  //         }
  //       ]
  //       // movies: [
  //       //   ...this.state.movies,
  //       //   //이 부분이 추가되어야 현재 영화 리스트에 추가됨(없는 경우 전체 영화 리스트를 하나로 바꿔버림)
  //       //   // {
  //       //   //   title: "ring of the lord",
  //       //   //   poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY999_CR0,0,673,999_AL_.jpg"
  //       //   // }
  //       // ]
  //     })
  //   }, 3000)
  // }

  componentDidMount() {
    this._getMovies();
  }

_renderMovies = () => {
  // 영화 list를 변수에 담아 출력
  const movies = this.state.movies.map((movie) => {
    console.log(movie)
    return <Movie 
    title={movie.title_english} 
    poster={movie.medium_cover_image} 
    key={movie.id} 
    genres={movie.genres} 
    synopsis={movie.synopsis}    />
  })
  return movies
}

 _getMovies = async () => {
  // await = call api 기능이 끝나기를 기다리고 리턴값이 무엇이든(성공이든 실패든 끝나면) 변수에 담게 함 (It means that we want to wait for the Promise() to finish before continue)
  const movies = await this._callApi()
  this.setState({
    movies
  })
}

_callApi = () => {
   // 가져와
  return fetch('https://yts.am/api/v2/list_movies.json?sort_by=like_count')
   // then(그러고 나서) 반응을 보여줘(잘 호출했는지, 사용중인지, 정보 등등), json 형식으로
   .then(response => response.json())
   .then(json => json.data.movies)
   // 에러가 난 경우에, 에러를 보여줘
   .catch(err => console.log(err))
}

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
      {/* state에 movies가 있으면, APP class를 붙이고, 없으면 App--loading 클래스(처음에는 무조건 없기때문에, App--loading클래스가 붙고, setState로 내용을 추가해줬기에 movies가 존재) */}
        {movies ? this._renderMovies() : 'Loading'}
        {/* 데이터가 있는지 체크 - true의 경우 함수 호출, false 의 경우 로딩 메시지 띄우기 */}
        {/* 이 부분이 먼저 존재해야하는이유 -> state가 선언되어 있지 않고, 랜더링 후에 setState을 통해 선언했기때문 (setState을 사용한 경우에는 그 후에 한번더 render()가 일어나기 때문)*/}
      </div>
    );
  }
}

export default App;
