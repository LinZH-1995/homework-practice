const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const MOVIES_PER_PAGE = 12
let filteredMovies = []
let currentPage = 1

const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const paginator = document.querySelector('#paginator')
const listwrapper = document.querySelector('.list-wrapper')
const tableList = document.querySelector('#table-list')


// addEventListener
dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

paginator.addEventListener('click', function onPaginatorClicked(event) {
  if (event.target.tagName !== 'A') return
  const page = Number(event.target.dataset.page)
  const cardList = document.querySelector('#card-list')
  if (cardList.style.color === 'skyblue') {
    renderMovieList(getMoviesByPage(page))
  } else if (cardList.style.color === 'black') {
    renderMovieLineList(getMoviesByPage(page))
  }
})

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()
  filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(keyword))
  if (filteredMovies.length === 0) {
    searchInput.value = ''
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`)
  }
  renderPaginator(filteredMovies.length)
  const cardList = document.querySelector('#card-list')
  if (cardList.style.color === 'skyblue') {
    renderMovieList(getMoviesByPage(1))
  } else if (cardList.style.color === 'black') {
    renderMovieLineList(getMoviesByPage(1))
  }
  searchInput.value = ''
})

listwrapper.addEventListener('click', function clickListButton(event) {
  const target = event.target
  if (target.matches('#card-list')) {
    renderMovieList(getMoviesByPage(currentPage))
    toggleStyle(target)
  } else if (target.matches('#line-list')) {
    renderMovieLineList(getMoviesByPage(currentPage))
    toggleStyle(target)
  }
})

tableList.addEventListener('click', function onTableListClicked(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModal(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

// function
function removeFromFavorite(id) {
  if (!movies) return
  const movieIndex = movies.findIndex(movie => movie.id === id)
  const filterMovieIndex = filteredMovies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return
  const cardList = document.querySelector('#card-list')
  movies.splice(movieIndex, 1)
  filteredMovies.splice(filterMovieIndex, 1)
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  if (cardList.style.color === 'skyblue') {
    renderMovieList(getMoviesByPage(1))
  } else if (cardList.style.color === 'black') {
    renderMovieLineList(getMoviesByPage(1))
  }
  const data = filteredMovies.length ? filteredMovies : movies
  renderPaginator(data.length)
}

function showMovieModal(id) {
  const modalTitle = document.querySelector('#movie-modal-title')
  const modalImage = document.querySelector('#movie-modal-image')
  const modalDate = document.querySelector('#movie-modal-date')
  const modalDescription = document.querySelector('#movie-modal-description')
  axios.get(INDEX_URL + id).then(response => {
    const data = response.data.results
    modalTitle.innerHTML = data.title
    modalImage.innerHTML = `<img src="${POSTER_URL + data.image
      }" alt="movie-poster" class="img-fluid">`
    modalDate.innerHTML = 'Release date: ' + data.release_date
    modalDescription.innerHTML = data.description
  })
}

function toggleStyle(target) {
  if (target.matches('#card-list')) {
    target.style = "cursor: pointer;color: skyblue"
    target.nextElementSibling.style = "cursor: pointer;color: black"
  } else if (target.matches('#line-list')) {
    target.style = "cursor: pointer;color: skyblue"
    target.previousElementSibling.style = "cursor: pointer;color: black"
  }
}

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies
  const startIndex = (page - 1) * MOVIES_PER_PAGE
  currentPage = page
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE)
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}


function renderMovieLineList(data) {
  dataPanel.innerHTML = ''
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `<tr>
          <th scope="row" class="line-title">${item.title}</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
          </td>
        </tr>`
  })
  tableList.innerHTML = rawHTML
}

function renderMovieList(data) {
  tableList.innerHTML = ''
  let rawHTML = ''
  data.forEach(item => {
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img src="${POSTER_URL + item.image}"
              class="card-img-top" alt="Movie Poster" />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal"
                data-target="#movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
            </div>
          </div>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHTML
}
renderPaginator(movies.length)
renderMovieList(getMoviesByPage(1))