import _ from 'lodash';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import '../css/EventCommentBox.css';

class EventCommentBox extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      at: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      userAvatar: PropTypes.string.isRequired,
    })),
    commentCount: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userAvatar: PropTypes.string.isRequired,
    }),
    add: PropTypes.func.isRequired
  }

  remove(commentId) {
    console.log('remove comment: ', commentId)
  }

  renderHeader() {
    return(
      <div className='comment-box-header'>
         <h3>コメント <span>{this.props.commentCount}件</span></h3>
      </div>
    )
  }

  renderComments() {
    const {comments, user} = this.props

    const content = comments.map((comment, index)=>(
        <div className='item comment-item' key={index}>
          <div className='inline fields'>

            <div className="two wide field img-avatar">
             <img className='ui avatar mini image' src={comment.userAvatar} alt='avatar'/>
            </div>
            <div className="twelve wide field content">
              <p className='comment-text'>{comment.text}</p>
            </div>
            <div className="two wide field time">
              <span>{comment.at}</span>
            </div>

             {
               comment.userId === user.id &&
               <button className='ui button remove-comment-btn'
                       onClick={()=> this.remove(comment.id)}>
               x
               </button>
             }
          </div>
        </div>
      ))

      return (
        <div className='ui list list-comment'>
          {content}
        </div>
      )
    }

    renderInputBox() {
      const {user} = this.props
      return (
        <div className='comment-box-input-form'>

              <form className='ui form' onSubmit={(e)=>{
                e.preventDefault()
                this.addNewComment()
                }}>
                <div className="inline fields">
                  <div className="two wide field">
                   <img className='ui avatar mini image'
                    src={user.userAvatar} alt='avatar'
                    />
                  </div>
                   <div className="fourteen wide field">
                       <input type='text' ref='commentRef'/>
                       <button className="ui button add-comment-btn btn-orange " type="submit">Submit</button>
                   </div>
                </div>
              </form>
        </div>

      )
    }

    renderLoadMore() {
      return (
        <div className='load-more-comment'>
        <button className='ui button'
                onClick={()=>{this.props.loadMore()}}
        >Load More</button>
        </div>
      )
    }

    addNewComment() {
      const {commentRef} = this.refs
      const text = commentRef.value
      if (!text && _.isEmpty(text)) {
        return;
      }
      const {user} = this.props
      const {id, userAvatar} = user

      this.props.add({
        text: text,
        userId: id,
        userAvatar: userAvatar
      })
      commentRef.text = ''
  }

  render() {

    return (
      <div className="event-comment-box">
      {this.renderHeader()}
      {this.renderInputBox()}
      {this.renderComments()}
      {this.renderLoadMore()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {eventId, limit} = ownProps
  const comments = [
    {
      id: "comment-1",
      text: "sample-comment-1",
      at: moment().locale('ja').startOf('hour').fromNow(),
      userId: 'test-user',
      userAvatar: '/img/avatar.png',
    },
    {
      id: "comment-2",
      text: "sample-comment-2",
      at: moment().locale('ja').startOf('hour').fromNow(),
      userId: 'test-user-2',
      userAvatar: '/img/avatar.png',
    },
    {
      id: "comment-3",
      text: "sample-comment-3",
      at: moment().locale('ja').startOf('hour').fromNow(),
      userId: 'test-user-3',
      userAvatar: '/img/avatar.png',
    }
  ]

  const user = {
    id: 'test-user-3',
    userAvatar: '/img/avatar.png',
  }

  const count = 12

  return {
    eventId: eventId,
    comments: comments,
    user: user,
    commentCount: count,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  add: (newComment) => {
    console.log("newComment", newComment)
  },
  loadMore: () => {
    console.log("load more")
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventCommentBox)
