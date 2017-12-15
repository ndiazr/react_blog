
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import { isNil } from 'lodash/fp';
import Input from 'react-toolbox/lib/input';
import Dialog from 'react-toolbox/lib/dialog';

class PostForm extends Component {

  static propTypes = {
     post: ImmutablePropTypes.map,
     createPost: PropTypes.func.isRequired,
     active: PropTypes.bool.isRequired,
     closeForm: PropTypes.func.isRequired,
   };

   static postState = () => fromJS({
     title: '',
     body: '',
   });

   state = {
    postState: PostForm.postState(),
  };


  onTitleChange = (value) => {
    const postState = this.state.postState.set('title', value);
    this.setState({ postState });
  }

  onBodyChange = (value) => {
    const postState = this.state.postState.set('body', value);
    this.setState({ postState });
  }

  componentWillReceiveProps(nextProps) {
    const { post } = nextProps;
    console.log(post);
    this.setState({ postState: post || PostForm.postState() });
    // this.setState({ postState: nextProps.post || PostForm.postState() }),
  }


  handleCreatePost = () => {
    const { createPost } = this.props;
    const post = this.state.postState.set('date', Date());
    this.setState({ postState: PostForm.postState() }, () => createPost(post));
  };

  handleEditPost = () => {
    const { editPost } = this.props;
    const { postState } = this.state;

    this.setState(
      {
          postState: PostForm.postState(),
      },
      () => editPost(postState),
    );
  };

  handleClose = () => {
    const { closeForm } = this.props;
    this.setState({ postState: PostForm.postState() });
    closeForm();
  };

  render() {

    console.log(this.state.postState);

    const { active, closeForm, post } = this.props;

    const actions = [
      { label: "Cancel", onClick: this.handleClose },
      {
        label: isNil(post) ? "Create" : "Update",
        onClick: isNil(post) ? this.handleCreatePost : this.handleEditPost,
      }
    ];
      return (
        <div>
          <Dialog
            actions={actions}
            active={active}
            onEscKeyDown={this.handleClose}
            onOverlayClick={this.handleClose}
            title='My awesome dialog'
          >
            <Input
              label="Title"
              onChange={this.onTitleChange}
              value={this.state.postState.get('title')}
            />
            <Input
              label="Body"
              onChange={this.onBodyChange}
              value={this.state.postState.get('body')}
            />
          </Dialog>

        </div>
      );
  }
}

export default PostForm;
