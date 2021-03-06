import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import style from './style';
import Comments from '../../CommentsApp/Comments'
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
} from 'react-toolbox/lib/card';
import { IconButton } from 'react-toolbox/lib/button';

class Post extends Component {
  static propTypes = {
    post: ImmutablePropTypes.map.isRequired,
    editPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  }
  state = {
    hideComments: true,
    buttonIcon: "visibility"
  }
  handleToggleComments = () => {
    if(this.state.hideComments){
      this.setState({hideComments:false, buttonIcon:"visibility_off"});
    }else{
      this.setState({hideComments:true, buttonIcon:"visibility"});
    }
  }
  render(){
    const { post, editPost, deletePost, id } = this.props;
      console.log(post);
    return(
      <Card style={{width: '600px'}}>
        <CardTitle
          title={post.get('title')}
          subtitle={post.get('date')}
        />
        <CardText>{post.get('body')}</CardText>

        <CardActions>
          <IconButton
            icon={this.state.buttonIcon}
            onClick={this.handleToggleComments}
          />
          <IconButton
            icon="edit"
            onClick={() => editPost(post)}
          />
          <IconButton
            icon="delete"
            onClick={() => deletePost(id)}
          />
        </CardActions>


        <div hidden={this.state.hideComments}>
          <Card>
            <CardTitle
              title="Comentarios"
            />
              <CardText >
                  <Comments />
              </CardText>
          </Card>
        </div>
      </Card>
    )
  }
}
export default Post;
