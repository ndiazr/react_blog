import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Posts from './Posts';
import {
  fetchPosts,
  createPost,
  editPost,
  deletePost,
} from '../../actions';

const mapStateToProps = (state) => ({
  postsData: state.postsData,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    fetchPosts,
    createPost,
    editPost,
    deletePost,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
