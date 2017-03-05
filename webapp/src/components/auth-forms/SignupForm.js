import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
//import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/SignupForm.css';

$.fn.form = require('semantic-ui-form')

class SignupForm extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    error: PropTypes.string,
    data: PropTypes.shape({
      email: PropTypes.string,
    }),
    onFBAuth: PropTypes.func.isRequired,
    onGGAuth: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  // process login with facebook
  // use external auth-service
  authFB(e) {
    e.preventDefault();
    this.props.onFBAuth()
  }

  // process login with google+
  // use external auth-service
  authGG(e) {
    e.preventDefault();
    this.props.onGGAuth()
  }

  initForm() {
    const {form} = this.refs
    const {data} = this.props

    //setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })

    // init form values
    $(form).form('set values', data)
  }

  // process login with email-password
  handleSubmit() {
    const {form} = this.refs

    // check where form data is valid1
    const valid = $(form).form('is valid')

    if (valid) {
      // get all field data to dict
      const cleaned = $(form).form('get values')
      console.log(cleaned)

       // submit data
      this.props.onSubmit(cleaned)
    }
  }

  render() {
    const {error} = this.props 
    const errorMessages = error ? error.split(',') : [];

    return (
        <form className='ui large form signup-form' ref='form'
              onSubmit={(e) => {
                e.preventDefault()
                this.handleSubmit()
              }}>

          <div className='ui segment'>

            <h2 className='tite-form center'>新規会員登録</h2>
            {error && 
                 errorMessages.map((e, index)=>
                 <div key={index} className="ui error visible message">{e}</div>
                 )
            }

            <div className='field'>
              <a className='ui button btn-link link-face' onClick={(e)=>{this.authFB(e)}}>
                <i className="facebook f icon icon-left"></i>Facebookでログイン
              </a>
            </div>

            <div className='field'>
              <a className='ui button btn-link link-gle' onClick={(e)=>{this.authGG(e)}}>
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
                      name="password"
                      placeholder="パスワードを入力してください（６文字以上）"/>
              </div>
              <div className="field">
                <label>パスワード（確認用）</label>
                <input
                      type="password"
                      name="password_confirmation"
                      placeholder="再度パスワードを入力してください（６文字以上）"/>
              </div>

              
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
