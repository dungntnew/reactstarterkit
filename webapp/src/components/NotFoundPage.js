import React from 'react';
import {Link} from 'react-router';

import '../css/NotFoundPage.css';

const NotFoundPage = (props) => (
  <div className='notfoud-page'>
	<h3 className='msg-title'>ページが表示できません</h3>
	<p className='msg-detail'>
	   ご不便をおかけて申し訳ございません。<br/>
	   更新してもご覧いただけない場合は、
	   <a href="mailto:info@revue.co.jp?subject=">「こちら」</a>よりお問い合わせください。
	</p>
	<Link to='/events/1'> 当イベントページ　へ
		 <i className=""></i>
	</Link>
  </div>
)

export default NotFoundPage
