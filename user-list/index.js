const searchInput = document.querySelector('#search-input')
const searchForm = document.querySelector('#search-form')
const userDataContainer = document.querySelector('#userDataContainer')
const modalContainer = document.querySelector('#modal-container')
const pagination = document.querySelector('#pagination')

const countryFlagURL = 'https://flagcdn.com/40x30/'
const countryCodesURL = 'https://flagcdn.com/en/codes.json'
const userURL = 'https://randomuser.me/api/?results=100'

const User_Per_Page = 15
const countryCodeDatas = []
const userDatas = []
let filterUsers = []
let pageAmount = 0
let page = 1


// function
function renderUserHTML(data) {
  let drawUserHTML = ''
  data.forEach(element => {
    const userGender = element.gender
    const userImage = element.picture.large
    const userFirstName = element.name.first
    const userLastName = element.name.last
    const userName = userFirstName + ' ' + userLastName
    const userNation = element.nat
    const userAge = element.dob.age + ' ' + 'years old'
    const userID = element.userID
    // (userGender === 'male') ? drawUserHTML += maleUserHTML(userImage, userName, userNation, userGender, userAge, index) : drawUserHTML += femaleUserHTML(userImage, userName, userNation, userGender, userAge, index)
    if (userGender === 'male') {
      drawUserHTML += maleUserHTML(userImage, userName, userNation, userGender, userAge, userID)
    } else {
      drawUserHTML += femaleUserHTML(userImage, userName, userNation, userGender, userAge, userID)
    }
  });
  userDataContainer.innerHTML = drawUserHTML
  renderModalHTML(data)
}

function maleUserHTML(image, name, nation, gender, age, id) {
  const maleUserHTML = `<div class="card p-4 bg-body-secondary" style="width: 18rem;">
        <button id="image-button" data-bs-target="#userModal${id}" data-bs-toggle="modal">
          <img src="${image}" class="card-img-top rounded-circle user-avatar" alt="avatar">
        </button>
        <div class="card-body text-center">
          <h5 class="card-title" id="user-name">${name}</h5>
          <p class="card-text" id="user-country"><img src="${countryFlagURL}${nation.toLowerCase()}.png" alt="">${' ' + nation}</p>
          <p class="card-text" id="user-gender">
            <i class="fa-solid fa-person"></i>
            ${gender}
          </p>
          <p class="card-text" id="user-age">${age}</p>
          <button type="button" class="btn btn-primary information-button" style="--bs-btn-font-size: .75rem;"
            data-bs-toggle="modal" data-bs-target="#userModal${id}" data-id="${id}">Information</button>
          <button type="button" class="btn btn-danger love-button" style="--bs-btn-font-size: .75rem;" data-id="${id}"><i class="fa-regular fa-heart" data-id="${id}"></i></button>
        </div>
      </div>`
  return maleUserHTML
}

function femaleUserHTML(image, name, nation, gender, age, id) {
  const femaleUserHTML = `<div class="card p-4 bg-body-secondary" style="width: 18rem;">
        <button id="image-button" data-bs-target="#userModal${id}" data-bs-toggle="modal">
          <img src="${image}" class="card-img-top rounded-circle user-avatar" alt="avatar">
        </button>
        <div class="card-body text-center">
          <h5 class="card-title" id="user-name">${name}</h5>
          <p class="card-text" id="user-country"><img src="${countryFlagURL}${nation.toLowerCase()}.png" alt="">${' ' + nation}</p>
          <p class="card-text" id="user-gender">
            <i class="fa-solid fa-person-dress"></i>
            ${gender}
          </p>
          <p class="card-text" id="user-age">${age}</p>
          <button type="button" class="btn btn-primary information-button" style="--bs-btn-font-size: .75rem;"
            data-bs-toggle="modal" data-bs-target="#userModal${id}" data-id="${id}">Information</button>
          <button type="button" class="btn btn-danger love-button" style="--bs-btn-font-size: .75rem;" data-id="${id}"><i class="fa-regular fa-heart" data-id="${id}"></i></button>
        </div>
      </div>`
  return femaleUserHTML
}

function renderModalHTML(data) {
  let drawModalHTML = ''
  data.forEach(element => {
    const userID = element.userID
    const userFirstName = element.name.first
    const userLastName = element.name.last
    const userName = userFirstName + ' ' + userLastName
    const userImage = element.picture.large
    const userNation = element.nat
    const countryAbbreviation = userNation.toLowerCase()
    const countryCode = countryCodeDatas[0][`${countryAbbreviation}`]
    const userBirthday = element.dob.date
    const userCity = element.location.city
    const userStreet = element.location.street.name
    const userStreetNumber = element.location.street.number
    const userAddress = userCity + ' ' + userStreet + ' ' + userStreetNumber
    const userCellPhone = element.cell
    const userEmail = element.email

    drawModalHTML += `<div class="modal fade" id="userModal${userID}" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title" id="modal-user-name">${userName}</h1>
              <span class="x-button" data-bs-dismiss="modal"><i class="fa-solid fa-xmark x-button"></i></span>
            </div>
            <div class="modal-body d-flex align-items-center justify-content-evenly p-1">
              <img class="modal-user-image" src="${userImage}" alt="">
              <div class="modal-user-data-wrapper">
                <p class="modal-user-country-flag"><img class="user-data" src="${countryFlagURL}${userNation.toLowerCase()}.png" alt="">${countryCode}</p>
                <p class="modal-user-birthday"><i class="fa-solid fa-cake-candles user-data"></i>${userBirthday}</p>
                <p class="modal-user-address"><i class="fa-solid fa-map-location-dot user-data"></i>${userAddress}</p>
                <p class="modal-user-phone"><i class="fa-solid fa-phone user-data"></i>${userCellPhone}</p>
                <p class="modal-user-email"><i class="fa-solid fa-envelope user-data"></i>${userEmail}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                style="--bs-btn-border-radius: 3rem;">Close</button>
            </div>
          </div>
        </div>
      </div>`
  });
  modalContainer.innerHTML = drawModalHTML
}

function toggleFavorite(target, id) {
  const trueTarget = target.lastElementChild ? target.lastElementChild : target
  if (trueTarget.matches('.fa-regular')) {
    const list = JSON.parse(localStorage.getItem('myFavorite')) || []
    const user = userDatas.find(user => user.userID === id)
    if (list.some(user => user.id === id)) {
      return alert('此用戶已在您的收藏清單中！')
    }
    list.push(user)
    localStorage.setItem('myFavorite', JSON.stringify(list))
    toggleHeart(target)

  } else if (trueTarget.matches('.fa-solid')) {
    const list = JSON.parse(localStorage.getItem('myFavorite')) || []
    if (!list) return
    const userIndex = list.findIndex(user => user.userID === id)
    if (userIndex === -1) return
    list.splice(userIndex, 1)
    localStorage.setItem('myFavorite', JSON.stringify(list))
    toggleHeart(target)
  }

}

function toggleHeart(target) {
  if (target.matches('.love-button')) {
    target.lastElementChild.classList.toggle('fa-regular')
    target.lastElementChild.classList.toggle('fa-solid')
  } else if (target.matches('.fa-heart')) {
    target.classList.toggle('fa-regular')
    target.classList.toggle('fa-solid')
  }
}

function renderPagination(data) {
  pageAmount = Math.ceil(data.length / User_Per_Page)
  let pages = ''
  for (let i = 1; i <= pageAmount; i++) {
    pages += `<li class="page-item page-number-button" data-page="${i}"><a class="page-link page-number-button" href="#" data-page="${i}">${i}</a></li>`
  }
  pagination.innerHTML = `<li class="page-item">
          <a class="page-link previous-button" href="#" aria-label="Previous">
            <span class="previous-button" aria-hidden="true">&laquo;</span>
          </a>
        </li>
        ${pages}
        <li class="page-item">
          <a class="page-link next-button" href="#" aria-label="Next">
            <span class="next-button" aria-hidden="true">&raquo;</span>
          </a>
        </li>`
}

function getRenderByPage(page) {
  const startIndex = (page - 1) * User_Per_Page
  const data = filterUsers.length ? filterUsers : userDatas
  const sliceData = data.slice(startIndex, startIndex + User_Per_Page)
  renderUserHTML(sliceData)
}


// addEventListener
userDataContainer.addEventListener('click', function clickUser(event) {
  const target = event.target
  if (target.matches('.love-button') || target.matches('.fa-heart')) {
    const id = Number(target.dataset.id)
    toggleFavorite(target, id)
  }
})

searchForm.addEventListener('submit', function submitSearch(event) {
  event.preventDefault()
  const keyword = searchInput.value.trim().toLowerCase()

  filterUsers = userDatas.filter((user) =>
    user.name.first.toLowerCase().includes(keyword) || user.name.last.toLowerCase().includes(keyword)
  )

  if (filterUsers.length === 0) {
    searchInput.value = ''
    return alert(`很遺憾\n您輸入的關鍵字： "${keyword}"\n沒有符合條件的用戶`)
  }

  renderPagination(filterUsers)
  getRenderByPage(1)
  searchInput.value = ''
})

pagination.addEventListener('click', function clickPages(event) {
  const target = event.target
  if (target.matches('.page-number-button')) {
    page = Number(target.dataset.page)
    getRenderByPage(page)
  } else if (target.matches('.previous-button')) {
    if (page > 1) {
      page -= 1
      getRenderByPage(page)
    } else {
      return
    }
  } else if (target.matches('.next-button')) {
    if (page < pageAmount) {
      page += 1
      getRenderByPage(page)
    } else {
      return
    }
  }
})


// axios.get
axios.get(userURL)
  .then(function (resp) {
    const users = resp.data.results
    userDatas.push(...users)
    userDatas.forEach((user, index) => {
      user.userID = index + 1
    })
    getRenderByPage(1)
    renderPagination(userDatas)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

axios.get(countryCodesURL)
  .then(function (resp) {
    const countryCodes = resp.data
    countryCodeDatas.push(countryCodes)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })