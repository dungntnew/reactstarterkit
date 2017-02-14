import React, {Component, PropTypes} from 'react'

import  '../css/AboutTable.css'

const AboutTable = (props) =>(
    <div className='about-table'>
      <div className='ui container block-content introduce center'>
        <h1 className='header-text'>Your Tableとは</h1>
        <p className='text-intro'>全国で開催される ”食” に関するイベントをプロモーションし、集客ができるサービスです。</p>
        <div className='ui three column stackable grid content-intro'>
          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header intro-title'>
                  イベンターを全面支援！
                </h4>
                <p className='intro-text'>
                  食のイベント集客を無料で簡単に！
                  レストラン経営の安定化や食材生産者・加工者の活動をサポート
                </p>
            </div>
          </div>

          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header intro-title'>
                  地域の食の魅力を広く発信
                </h4>
                <p className='intro-text'>
                  地域の食材、食文化を宣伝します！
                  地域振興、商店街活性化、
                  国内ブランドの海外への発信も！
                </p>
            </div>
          </div>

          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header intro-title'>
                イベンターを全面支援！
                </h4>
                <p className='intro-text'>
                  食のイベント集客を無料で簡単に！
                  レストラン経営の安定化や食材生産者・加工者の活動をサポート
                </p>
            </div>
          </div>

        </div>
      </div>

      <div className='ui container block-content customers center'>
        <h1 className='header-text'>お客様と”食”をマッチング</h1>
        <p className='text-intro'>”食”のイベントに参加したいお客様と、個人の料理教室、レストラン主催のイベント、大規模な食イベント</p>
        <p className='text-intro'>地域おこしの食イベントなどの”食”のイベントを主催する主催者をつなぐ架け橋に！</p>
        <div className='content-customers'>
          <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
          <img className='page-logo'
           alt='Page-Logo'
           src='/img/logomark_color.png'
           />
          <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>

        </div>
      </div>

      <div className='ui container block-content purpose-table center'>
        <h1 className='header-text'>Your Tableの目的</h1>
        <p className='text-intro'>“食”をテーマにしたイベントは、様々な課題を抱えています。</p>
        <p className='text-intro'>それはイベント企画者、参加者を的確につなぐことができていないことによって起きています</p>
        <div className='ui two column stackable grid content-purpose'>
          <div className='column'>
            <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
            <p className='title'>イベント主催者側の悩み</p>
            <div className='text-content'>
              <p className='text'>広報での悩み</p>
              <p className='text'>企画を安価に告知して拡げる適正ツールが見つからない</p>
            </div>
            <div className='text-content'>
              <p className='text'>広報での悩み</p>
              <p className='text'>企画を安価に告知して拡げる適正ツールが見つからない</p>
            </div>
          </div>

          <div className='column'>
            <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
            <p className='title'>イベント主催者側の悩み</p>
            <div className='text-content'>
              <p className='text'>広報での悩み</p>
              <p className='text'>企画を安価に告知して拡げる適正ツールが見つからない</p>
            </div>
            <div className='text-content'>
              <p className='text'>広報での悩み</p>
              <p className='text'>企画を安価に告知して拡げる適正ツールが見つからない</p>
            </div>
          </div>
        </div>

        <h3 className='text-table'>Your Tableはそれぞれの悩みを解する機能があります</h3>
        <div className='ui four column stackable grid center about-problem'>
          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header title'>
                  登録完全無料
                </h4>
                <p className='text'>
                  食専門のサービスなので
                  ターゲットが明確！
                </p>
            </div>
          </div>

          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header title'>
                  クレジットカードによるID確認
                </h4>
                <p className='text'>
                  連絡手段、事前決済
                  キャンセル返金も対応
                </p>
            </div>
          </div>

          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header title'>
                  最適な検索システム
                </h4>
                <p className='text'>
                  興味のあるイベントを
                  簡単に見つけ出すことができる
                </p>
            </div>
          </div>

          <div className='column'>
            <div className='ui segment content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
                <h4 className='ui header title'>
                  評価制度
                </h4>
                <p className='text'>
                  過去履歴や評価システムを参考に参加者は安心して参加できる
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className='ui container block-content strength-table center'>
        <h1 className='header-text'>Your Tableの強み</h1>
        <p className='text-intro'>WEB制作の専門家が先行他社を徹底的に研究し、使いやすいサイトを構築！</p>
        <p className='text-intro'>さらに！食のイベント仲介以外にも各種コンサルティングに食の専門家が携わります。</p>
        <div className='ui two column stackable grid content-strength'>
          <div className='column'>
            <div className='content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
              <h3 className='title'>志田由彦</h3>
              <span className='des'>シダ☆ラボ主宰・フードレボリューショナリスト</span>
              <div className='text-content'>
                <p className='text'>1万人以上の料理人を指導したシダヨシヒコによる、
                料理人たちの「出会い」「成長」「共有」という、多忙な日常の中ではなかなか手に入らないサービスを提供するサロンを運営。
                料理人会員に出会い・共有・成長を提供し、シェフの地位向上やさらなる発展を支援することをミッションとしている。</p>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='content-item'>
              <img className='img-cover' alt='cover-img' src='/img/event-3.jpg'/>
              <h3 className='title'>片桐新之介</h3>
              <span className='des'>フードプランナー</span>
              <div className='text-content'>
                <p className='text'>元大手百貨店食品部勤務を経て、6次産業化プランナーとして関西を中心に農水産品の開発、販路拡大に尽力する。
                ＮＰＯ法人　農家のこせがれネットワーク関西代表。利き酒師。地域での食のイベント企画立案や政策コンサルティングも行う。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

export default AboutTable

