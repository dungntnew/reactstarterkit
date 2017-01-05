import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
//import classNames from 'classnames';
// default fields validations,
// ignore this, setup late is OK
//import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/SendMailOk.css';

$.fn.form = require('semantic-ui-form')

class SendMailOk extends Component {

  static propTypes = {
    displayMail: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  render() {
    return (

        <div className='ui large form send-mail-ok'>
          <div className='ui segment'>
            <h2 className='tite-form center'>パスワードをお忘れの方</h2>
            <h3 className='text-comfirm'>メールを送信しました。</h3>
            <div className='field'>
              <p className='note-form center'>{this.props.displayMail}0725shaq@gmail.comへメールを送信しました。
                                              メールに記載されたURLをクリックして、パスワードの変更を完了して
                                              ください。</p>
            </div>

            <div className='field field-text'>
              <a className='text-link center' href={this.props.url}>TOPへ戻る</a>
            </div>
          </div>
        </div>
    )
  }
}
export default SendMailOk;
