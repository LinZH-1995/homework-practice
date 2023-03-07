# 1. Movie List

A movie list show the movies that call from [API](https://movie-list.alphacamp.io/api/v1/movies/) by used [AXIOS](https://github.com/axios/axios)

## Features

### Show Movie Information
* click movie image or ```More``` button

### Add Movie To Favorite 
* click ```+``` button - ( only on ***Home Page*** )

### Delete Movie From Favorite
* click ```X``` button - ( only on ***Favorite Page*** )

### Search Movie
* type keyword of movie title in search bar - ( ***case insensitive*** )


# 2. User List

A random fake user list show the random fake people that call from [RANDOM USER GENERATOR API](https://randomuser.me/) by used [AXIOS](https://github.com/axios/axios)

## Features

### Show User Information
* click ```Information``` button

### Add User To Favorite
* click ```🤍``` button - ( when it is ***empty***, only on ***Home Page*** )

* ***This feature might have a bug if you refresh the page. Because this [RANDOM USER GENERATOR API](https://randomuser.me/) is a random API cause can't filter whether user is in the localStorage of favorite. If you want test the feature please dont refresh the page.***
* ***Assume that you already refresh the page. Open the DevTools and go Application page to delete the data that name "myFavorite" in localStorage then refresh the page. After done, this feature would be normal again***

### Delete User From Favorite
* click ```❤``` button - ( when it is ***solid***, only on ***Home Page***  )
* click ```x``` button - ( only on ***Favorite Page*** )

### Search User
* type keyword of user firstname/lastname in search bar - ( ***case insensitive*** )
