import $ from 'jquery';
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import classNames from 'classnames';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import 'semantic-ui-dimmer/dimmer.min.css'
import 'semantic-ui-modal/modal.min.css'

import '../css/MyPage.css';

$.fn.dimmer = require('semantic-ui-dimmer')
$.fn.modal = require('semantic-ui-modal')

class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmMessage: '',
      activeLink: '',
    }
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  componentDidMount() {
      $('.ui.sidebar').sidebar({
          transition: 'overlay'
      });
  }

  toggleSidebar () {
      $('.ui.sidebar').sidebar('toggle');
  }

  link(to, title) {
    return (
      <Link 
      to={to}
      className={classNames({
        item: true,
        active: to === this.state.activeLink
      })}
      onClick={()=>{ this.setState({activeLink: to})}}
      >{title}</Link>
    )
  }

  renderMenu() {

    return (
      <div className="ui secondary vertical pointing menu">
          <div className="item">
            <div className="header">テーブル管理</div>
            <div className="menu">
              {this.link('/mypage/events/created/all', '登録したテーブル')}
              {this.link('/mypage/events/liked/all', 'お気に入りテーブル')}
              {this.link('/mypage/events/joined/all', '参加テーブル')}
              {/*<Link className="item" activeClassName="active" to="/mypage/events/reviewed">レビュー一覧</Link> */}
            </div>
          </div>
          <div className="item">
            <div className="header">売上・振込</div>
            <div className="menu">
              <Link className="item" activeClassName="active" to="/mypage/profit-apply">売上の記録</Link>
              <Link className="item" activeClassName="active" to="/mypage/profit-list">支払いの記録</Link>
              <Link className="item" activeClassName="active" to="/mypage/profit-history">振り込み履歴</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">通知・ニュース</div>
            <div className="menu">
              <Link className="item" activeClassName="active" to='/mypage/news'>ニュース一覧</Link>
              {/*<a className="item">通知一覧</a> */}
            </div>
          </div>
          {/*
          <div className="item">
            <div className="header">友達・フロー</div>
            <div className="menu">
              <a className="item">友達一覧</a>
              <a className="item">フロー一覧</a>
            </div>
          </div>
          */}
          <div className="item">
            <div className="header">アカウント設定</div>
            <div className="menu">
              <Link className="item" activeClassName="active" to="/mypage/change-password">パスワード変更</Link>
              <Link className="item" activeClassName="active" to="/mypage/creditcard-settings">クレジットカード変更</Link>
              <Link className="item" activeClassName="active" to="/mypage/bank-settings">お振込先銀行口座編集</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">そのほか</div>
            <div className="menu">
              <Link className="item" activeClassName="active" to="/mypage/fqa">ヘールプ/FQA</Link>
              <Link className="item" activeClassName="active" to="/mypage/contact">お問い合わせ</Link>
              <a className="item">ログアウト</a>
            </div>
          </div>
        </div>
    )
  }

  showConfirmDiaLog(msg) {
    this.setState({
      confirmMessage: msg,
    })
    $(this.refs.confirmDiaLog).modal('show')
  }

  hideConfirmDiaLog() {
    this.setState({
      confirmMessage: '',
    })
    $(this.refs.confirmDiaLog).modal('hide')
  }

  renderConfirmDiaLog() {
    return (
      <div className='ui modal' ref='confirmDiaLog'>
         {this.state.confirmMessage}
      </div>
    )
  }

  render() {
    const content = (
      <div className='ui stackable two column vertically divided grid'>
        <div className="toggle-sidebar">
          <i className="list layout large icon" onClick={this.toggleSidebar}></i>
        </div>
        <div className='ui left floated three wide column left-menu sidebar'>
        {this.renderMenu()}
        </div>
        <div className='ui left floated three wide column left-menu sidebar-pc'>
        {this.renderMenu()}
        </div>
        <div className='left floated thirteen wide column container-render'>
        {this.props.children}
        </div>
      </div>
    )

    return (
      <div className='mypage'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          <div className='ui container'>
            {content}
            {this.renderConfirmDiaLog()}
          </div>
          <PageFooter />
      </div>
    )
  }
}

export default MyPage
