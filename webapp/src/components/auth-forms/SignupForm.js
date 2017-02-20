import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
//import classNames from 'classnames';
// default fields validations,
// ignore this, setup late is OK
//import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/SignupForm.css';

$.fn.form = require('semantic-ui-form')

class SignupForm extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    facebookUrl: PropTypes.string.isRequired,
    googleUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
        <form className='ui large form signup-form'>

          <div className='ui segment'>

            <h2 className='tite-form center'>新規会員登録</h2>
            <div className='field'>
              <a className='ui button btn-link link-face' href={this.props.facebookUrl}>
                <i className="facebook f icon icon-left"></i>Facebookでログイン
              </a>
            </div>

            <div className='field'>
              <a className='ui button btn-link link-gle' href={this.props.goooleUrl}>
                <i className="google icon icon-left"></i>Google+でログイン
              </a>
            </div>

            {/*<div className="line"></div>*/}

              <div className="field">
                <label>メールアドレス</label>
                <input
                      type="email"
                      name="email"
                      placeholder="メールアドレスを入力して下さい"/>
              </div>
              <div className="field">
                <label>パスワード</label>
                <input
                      type="password"
                      name="password1"
                      placeholder="パスワードを入力してください（６文字以上）"/>
              </div>
              <div className="field">
                <label>再度パスワード</label>
                <input
                      type="password"
                      name="password2"
                      placeholder="再度パスワードを入力してください（６文字以上）"/>
              </div>
              <div className="ui error message"></div>
            
            <button className="ui button btn-link btn-orange" type="submit">メールアドレスで登録</button>

            <div className='field'>
              <p className='note-form center'>登録することをもって私は、Airbnbのサービス利用規約、決済サービス利用規約、個人情報保護ポリシー、ゲスト返金ポリシー、ホスト保証規約に同意します。</p>
            </div>

          </div>
        </form>
    )
  }
}

export default SignupForm;
