import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'

                        // Action Creator for comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then((response) => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err.message)))
}

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
}) 

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (err) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload: err
})

export const addComment = (data) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: data
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    console.log('rk')
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            dispatch(addComment(response.json()),2000)
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};



                            //ActionCreator for dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then((response) => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
}) 

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesFailed = (err) => ({
    type : ActionTypes.DISHES_FAILED,
    payload: err
})

//                      ActionCreators for promotions

export const fetchPromotions = () => (dispatch) => {
    return fetch(baseUrl + 'promotions')
    .then((response) => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)))
    .catch(err => dispatch(promotionsFailed(err.message)))
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
}) 

export const addPromotions = (promos) => ({
    type : ActionTypes.ADD_PROMOS,
    payload: promos
})

export const promotionsFailed = (err) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload: err
})

// ActionCreator for Leaders


export const fetchLeaders = () => (dispatch) => {
    return fetch(baseUrl + 'leaders')
    .then((response) => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
}) 

export const addLeaders = (leaders) => ({
    type : ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersFailed = (err) => ({
    type : ActionTypes.LEADERS_FAILED,
    payload: err
})

export const postFavorite = (dishId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};


export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
})