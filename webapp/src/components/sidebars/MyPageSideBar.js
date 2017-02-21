const MyPageSideBar = (props) => {
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
    ) ;
}