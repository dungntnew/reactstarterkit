import React from 'react';
  import {Link} from 'react-router';

import '../css/LPBaner02.css';

/*
TODO: fix css and className
This implement is draft version!
Please check in smartphone also
*/

const LPBaner02 = (props) => (
  <div className='ui fluid lp-baner-02'>
      <div className='ui center aligned segment basic'>
         <div className='art-title'>イベント主催者のみなさま</div>
         <p className='art-text'>
         フード関連のイベント管理に YourTable を使ってみませんか？
         イベントスペースの手配から、器具機材の調達までサポート致します。
         </p>

         <div>
         <Link className='ui orange button art-button' to='/create'>はじめる</Link>
         </div>

      </div>
  </div>
)

export default LPBaner02
