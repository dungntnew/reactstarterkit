import React from 'react';
import {Link} from 'react-router';

import '../css/NotFoundPage.css';

const NotFoundPage = (props) => (
  <div className='notfoud-page'>
	<p>ご依頼いただきたページが存在おりません！ </p>
	<Link to='/'> トップへ
		 <i className=""></i>
	</Link>
  </div>
)

export default NotFoundPage
