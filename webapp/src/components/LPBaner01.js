import React from 'react';
  import {Link} from 'react-router';

import '../css/LPBaner01.css';

/*
TODO: fix css and className
This implement is draft version!
Please check in smartphone also
*/

const LPBaner01 = (props) => (
  <div className='lp-baner-01'>
    <h4>YourTable</h4>
    <p>全国で開催される ”食” に関するイベントをお客様にプロモーションし集客ができるサービスです。</p>

    <div className='ui three column grid'>
        {/* block 1 */}
        <div className='column'>
          <div className='ui segment art-block'>
              <img alt='art-img-1' className='ui image art-img art-img-1' src={props.artImgUrl}/>
              <p className='art-title'>
              食の担い手を成長
              </p>
              <p className='art-text'>
              食イベント集客を支援しシェフの地位向上！レストラン経営安定化、食材生産者加工者の収益を高める！
              </p>
            </div>
        </div>


        {/* block 2 */}
        <div className='column'>
          <div className='ui segment art-block'>
              <img alt='art-img-2' className='ui image art-img art-img-2' src={props.artImgUrl}/>
              <p className='ui header art-title'>
              地域の食の魅力を広く発信
              </p>
              <p className='art-text'>
              地域の食材、食文化を広く伝える、地域活性化、商店街活性化海外への発信も！
              </p>
            </div>
        </div>


          {/* block 3 */}
          <div className='column'>
            <div className='ui segment art-block'>
                <img alt='art-img-3' className='ui image art-img art-img-3' src={props.artImgUrl}/>
                <p className='art-title'>
                人と人を繋げ新しい仲間を
                </p>
                <p className='art-text'>
                安心安全なイベントのみをご紹介！人のつながりを創り食のコミュニティを通じた経済効果を生み出す！
                </p>
              </div>
          </div>

      </div>

      <div>
      <Link className='ui orange button art-button' to='/about'>もっと詳しく</Link>
      </div>

  </div>
)

export default LPBaner01
