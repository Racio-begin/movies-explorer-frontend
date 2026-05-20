import request from './request';

class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  getInitialMovies() {
    return request(this._url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default MoviesApi;
