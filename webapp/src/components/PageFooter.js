import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router';

import '../css/PageFooter.css';

const urlMap = {
  'FIND': [
    {
      'url': '/categories',
      'label': 'カテゴリー一覧'
    },
    {
      'url': '/places',
      'label': '地域一覧'
    },
    {
      'url': '/special',
      'label': 'スペシャルテーブル'
    },
    {
      'url': '/trend',
      'label': 'ポピュラーテーブル'
    },
    {
      'url': '/latest',
      'label': '最新テーブル'
    }
  ],
  'HELP': [
    {
      'url': '/help#how-to-join',
      'label': 'イベントへの参加方法'
    },
    {
      'url': '/help#host',
      'label': 'イベントの主催方法　'
    },
    {
      'url': '/help#suport-center',
      'label': 'サポートセンター　'
    },
    {
      'url': '/help#faq',
      'label': 'FAQ'
    },
    {
      'url': '/help#contact',
      'label': 'お問い合わせ'
    }
  ],
  'OTHERS': [
    {
      'url': '/pricy#security',
      'label': 'プライバシーポリシー'
    },
    {
      'url': '/terms#usage',
      'label': '利用規約　'
    },
    {
      'url': '/about#company',
      'label': '会社概要　'
    },
    {
      'url': '/help/#other',
      'label': '特定商取引に関する表記'
    }
  ],
  'SOCIAL': [
    {
      'url': '/redirect/#facebook',
      'label': 'Facebook',
      'icon': 'facebook icon'
    },
    {
      'url': '/redirect/#twitter',
      'label': 'Twitter',
      'icon': 'twitter icon'
    },
    {
      'url': '/redirect/#instagram',
      'label': 'Instagram',
      'icon': 'instagram icon'
    },
  ]
}

const linkItems = _.mapValues(urlMap, (links) => {
  return links.map(link => {
    if (link.icon) {
      return (
        <Link to={link.url} >
            <i className={link.icon}></i>{link.label}
        </Link>
      )
    }
    return (
      <Link key={link.url} to={link.url} >{link.label}</Link>
    )
  })
})

const linkBlockContent = (blockName) => {
  const links = linkItems[blockName]

  return links.map((link, index) =>
    <li key={index}
       className='link-item'>
       {link}
    </li>
  )
}

const linkBlocks = (blockName) => (
  <div className='link-block'>
    <div className='link-block-header'>
    {blockName}
    </div>
    <ul className='link-block-content'>
    {linkBlockContent(blockName)}
    </ul>
  </div>
)


console.log(linkBlocks('FIND'))

const PageFooter = (props) => (
  <div className='page-footer'>
    {linkBlocks('FIND')}
    {linkBlocks('HELP')}
    {linkBlocks('OTHERS')}
    {linkBlocks('SOCIAL')}
  </div>
)
export default PageFooter;
