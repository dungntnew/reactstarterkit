import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../css/TestPage.css';

// import Logo from '../components/PageLogo';
// import LPHeader from '../components/LPHeader';
// import TopNav from '../containers/TopNav';
// import UserMenu from '../components/UserMenu';
import EventItem from '../components/EventItem';
import EventTags from '../components/EventTags';
import RangedDateSelector from '../components/RangedDateSelector';


// const user = {
//   avatarUrl: '/img/avatar.png',
//   name: 'Nguyen Tri Dung',
//   id: '1',
//   url: '/user/dungntnew'
// }

const event = {
    coverImageUrl: '/img/avatar.png',
    price: 100,
    title: 'Test Event',
    address: 'Yokohama Tokyo',
    tags: ['A', 'B', 'C'],
    joinerCount: 5,
    joinerLimit:　10,
    openDate: '20160112',
    registrationDateStart: '20160112',
    registrationDateEnd:'20160112',
    url: '/events/1',
}

import {addTodo, getTodos, isFetching} from '../flux/modules/todo';
import {requestTodos, receiveTodos, fetchLatestTodos, fetchLatestTodosIfNeed} from '../flux/modules/todo';

class TodoApp extends Component {

  componentDidMount() {
    this.props.refreshTodos();
  }

  render() {
    return (
      <div className='ui segment'>
         <input type='text' ref='text'/>
         <button type='submit' onClick={(e)=>{
           e.preventDefault()
           this.props.addTodo({
             text: this.refs.text.value
           })
         }}>Add Todo</button>

        <button type='submit' onClick={(e)=>{
          e.preventDefault()
          this.props.refreshTodos()
        }}>Refresh</button>

         <hr />
         {this.props.loading && (<h4>'Fetching...'</h4>)}
         <ul className='list'>
         {
            this.props.todos.map((t, i)=>(
              <li key={i} className='item'>
              {t.text}
              </li>
            ))
         }
         </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: getTodos(state),
  loading: isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: (payload) => {
    dispatch(addTodo(payload))
  },
  refreshTodos: () => {
    dispatch(fetchLatestTodosIfNeed(100))
  }
})

const TodoAppX = connect(mapStateToProps, mapDispatchToProps)(TodoApp)

/* Put your component to here to view */
export default (props) => (
  <div>
     <p> This is TestPage, you can quick place your component to view</p>
     <pre>
          "TestComponent"  => "YourComponent"
     </pre>
     <hr/>
     <div className='test-page-wrapper'>
         <TodoAppX />
     </div>
  </div>
)
