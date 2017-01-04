import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import '../css/MemberList.css';

const MemberList = (props) => {
  const {members, onRemove} = props

  const items = members.map((member, index)=>(
    <div className='item' key={index}>
      <div className='ui avatar tiny image'>
        <Link to={member.url}>
           <img className='img-avatar' src={member.userAvatar} alt='avatar'/>
        </Link>
      </div>
      <div className="content">
        {member.displayName}
      </div>

      <div className='right floated btn-remove'>
         <div className='ui button'
              onClick={()=> onRemove(member.id)}
         >
         追放
         </div>
      </div>
    </div>
  ))

  return (
    <div className='ui segment member-list'>
      <h3 className='center title-memeber-list'>参加者一覧</h3>
      <div className='ui middle aligned divided list'>
         {items}
      </div>
    </div>
  )
}


MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })),
  onRemove: PropTypes.func.isRequired
}

export default MemberList
