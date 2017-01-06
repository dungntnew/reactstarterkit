import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import '../css/MyPage.css';

class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  componentDidMount() {

  }

  renderMenu() {
    return (
      <div className="ui secondary vertical pointing menu">
          <div className="item">
            <div className="header">テーブル管理</div>
            <div className="menu">
              <Link className="item" to="/mypage/events/created">登録したテーブル</Link>
              <Link className="item" to="/mypage/events/liked">お気に入りテーブル</Link>
              <Link className="item" to="/mypage/events/joined">参加テーブル</Link>
              <Link className="item" to="/mypage/events/reviewed">レビュー一覧</Link>
            </div>
          </div>
          <div className="item">
            <div className="header">売上・振込</div>
            <div className="menu">
              <a className="item">売上の記録</a>
              <a className="item active">支払いの記録</a>
              <a className="item">振り込み履歴</a>
            </div>
          </div>
          <div className="item">
            <div className="header">通知・ニュース</div>
            <div className="menu">
              <a className="item">通知一覧</a>
              <a className="item">ニュース一覧</a>
            </div>
          </div>
          <div className="item">
            <div className="header">友達・フロー</div>
            <div className="menu">
              <a className="item">友達一覧</a>
              <a className="item">フロー一覧</a>
            </div>
          </div>
          <div className="item">
            <div className="header">アカウント設定</div>
            <div className="menu">
              <a className="item">パスワード変更</a>
              <a className="item">クレジットカードの管理</a>
              <a className="item">お振込先銀行口座編集</a>
            </div>
          </div>
          <div className="item">
            <div className="header">そのほか</div>
            <div className="menu">
              <a className="item">ヘールプ/FQA</a>
              <a className="item">お問い合わせ</a>
              <a className="item">ログアウト</a>
            </div>
          </div>
        </div>
    )
  }

  render() {
    const content = (
      <div className='ui sixteen wide column left aligned grid'>
        <div className='left floated three wide column'>
        {this.renderMenu()}
        </div>
        <div className='left floated thirteen wide column'>
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
          {content}
          <PageFooter />
      </div>
    )
  }
}

export default MyPage
