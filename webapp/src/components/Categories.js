import React, {Component} from 'react'
import {Link} from 'react-router';

import '../css/Categories.css'

const links = [

  {
    'url': '/category/#1',
    'name': '角煮'
  },
  {
    'url': '/category/#2',
    'name': 'フェス'
  },
  {
    'url': '/category/#2',
    'name': '会員制'
  },
]

  const linkCategories = links.map(link => {
    return(
      <Link to={link.url}>{link.name}</Link>
    )
  })

  const Categories = (props) => {
    const links = linkCategories
    return links.map((link, index) =>
      <span key={index} className='cetegory'>{link}</span>
    )
  }

export default Categories
