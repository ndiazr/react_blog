import assign from 'lodash/fp/assign';
import { endpoints } from '../constants';

export const receivePosts = (posts) => (
  {
    type: 'RECEIVE_POSTS',
    posts,
  }
);

export const refreshPosts = () => (
  {
    type: 'REFRESH_POSTS',
  }
);

export const togglePostsLoading = () => ({
  type: 'TOGGLE_POSTS_LOADING',
});

export function createPost(post) {
  console.log(post);
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assign({}, post)),
    })
    .then(response => {
      dispatch(togglePostsLoading())
      dispatch(refreshPosts())
      // dispatch(receiveCreatePost(response))
    });
  };
}

export function editPost(post) {
  console.log(post);
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch(`${endpoints.posts}/${post.id}`, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(assign({}, post)),
    })
    .then(response => {
      dispatch(togglePostsLoading())
      dispatch(refreshPosts())
      // dispatch(receiveCreatePost(response))
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch(`${endpoints.posts}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(togglePostsLoading())
      dispatch(refreshPosts())
      // dispatch(receiveCreatePost(response))
    });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(togglePostsLoading());
    return fetch('http://localhost:3000/posts', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      dispatch(receivePosts(json));
      dispatch(togglePostsLoading());
    });
  };
}
