import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/LoginForm.css';

$.fn.form = require('semantic-ui-form')

class LoginForm extends Component {
  static propTypes = {
    error: PropTypes.string,
    data: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onFBAuth: PropTypes.func.isRequired,
    onGGAuth: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
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

  render() {
    const {error} = this.props 
    const errorMessages = error ? error.split(',') : [];

    return (
        <form className='ui large form login-form' ref='form'
              onSubmit={(e) => {
                e.preventDefault()
                this.handleSubmit()
              }}>

          <div className='ui segment'>
            <h2 className='tite-form center'>ログイン</h2>
            {error && 
                 errorMessages.map((e, index)=>
                 <div key={index} className="ui error visible message">{e}</div>
                 )
            }
            <div className='field'>
              <a className='ui button btn-link link-face' onClick={(e)=>{
                this.authFB(e)
              }}>
                <i className="facebook f icon icon-left"></i>Facebookでログイン
              </a>
            </div>

            <div className='field'>
              <a className='ui button btn-link link-gle' onClick={(e)=>{
                this.authGG(e)
              }}>
                <i className="google icon icon-left"></i>Google+でログイン
              </a>
            </div>

          <div className="field">
            <input
                  type="email"
                  name="email"
                  placeholder="メールアドレス"/>
          </div>

          <div className="field">
            <input
                  type="password"
                  name="password"
                  placeholder="パスワード"/>
          </div>

          <div className="ui error message"></div>
          <button className="ui button btn-link btn-orange" type="submit">ログイン</button>

          <div className='field field-text'>
            <a href="mailto:info@revue.co.jp?subject=">パスワードをお忘れの方はこちら</a>
            {/*<Link to='/forgot-password' className='text-forget-pass center'>
               パスワードをお忘れの方はこちら
            </Link>
            */}
          </div>
        </div>
        </form>
    )
  }
}

export default LoginForm;
