import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
//import classNames from 'classnames';
// default fields validations,
// ignore this, setup late is OK
//import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/ResetPassOk.css';

$.fn.form = require('semantic-ui-form')

class ResetPassOk extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
  }

  render() {
    return (

        <div className='ui large form reset-pass-ok'>
          <div className='ui segment'>
            <h2 className='tite-form center'>新しいパスワードの設定</h2>
            <h3 className='text-comfirm'>パスワードに設定が完了しました。</h3>
            <div className='field'>
              <p className='note-form center'>次回から新しいパスワードでログインができます。</p>
            </div>

            <div className='field field-text'>
              <a className='text-link center' href={this.props.url}>ログイン</a>
            </div>
          </div>
        </div>
    )
  }
}
export default ResetPassOk;
