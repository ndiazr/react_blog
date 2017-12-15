import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { findIndex, set } from 'lodash/fp';
import { fromJS, List } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';
import { endpoints } from '../../constants';

class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    postsData: ImmutablePropTypes.map.isRequired,
  };

  state = {
    // posts: List(),
    showForm: false,
    postToEdit: undefined,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    const { fetchPosts } = this.props;
    const { postsData } = nextProps;
    if (!postsData.get('postsLoading') && postsData.get('refresh')) {
      fetchPosts();
    }
  }

  createPost = (post) => {
    const { createPost } = this.props;
    this.setState({ showForm: false }, () => createPost(post.toJS()));
  };

  handleEditPost = (post) => {
    const { editPost } = this.props;
    this.setState({ showForm: false }, () => editPost(post.toJS()));
  };

  handleEditPostForm = (id, post) => {
    this.setState({
      showForm: true,
      postToEdit: post
        .set('id', id)
        .set('updated_at', Date()),
    });
  };

  handleDeletePost = (id) => {
    const { deletePost } = this.props;
    deletePost(id);
  }

  handleShowForm = () => {
    this.setState({ showForm: true });
  };

  handleCloseForm = () => {
    this.setState({ showForm: false, postToEdit: undefined });
  };

  render() {
    const posts = this.props.postsData.get('posts');
    console.log(posts);
    const postItems = posts.map(post => (
      <Post
        key={post.get('_id')}
        id={post.get('_id')}
        post={post}
        editPost={this.handleEditPostForm}
        deletePost={this.handleDeletePost}
      />
    )).toJS();

    return (
      <div>
        {postItems}
        <PostForm
          active={this.state.showForm}
          createPost={this.createPost}
          editPost={this.handleEditPost}
          closeForm={this.handleCloseForm}
          post={this.state.postToEdit}
        />
        <Button
          icon="add"
          label="Create post"
          onClick={this.handleShowForm}
        />
      </div>
    );
  }

}

export default Posts;
