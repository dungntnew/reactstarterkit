import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
//import classNames from 'classnames';
// default fields validations,
// ignore this, setup late is OK
//import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/LoginForm.css';

$.fn.form = require('semantic-ui-form')

class LoginForm extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    data: PropTypes.shape({
      //todo
    }).isRequired,
    facebookUrl: PropTypes.string.isRequired,
    googleUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form} = this.refs
    const {data} = this.props

     // setup validations
    // $(form).form({
    //     on: 'blur',
    //     fields: defaultRules
    // })

    // init form values
    $(form).form('set values', data)
  }

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
    return (
        <form className='ui form login-form' ref='form'
              onSubmit={(e) => {
                e.preventDefault()
               this.handleSubmit()
              }}>

          <h2 className='tite-form center'>ログイン</h2>
          <div className='field'>
            <a className='ui button btn-link' href={this.props.facebookUrl}><i className=''></i>Facebookでログイン</a>
          </div>

          <div className='field'>
            <a className='ui button btn-link' href={this.props.goooleUrl}><i className=''></i>Google+でログイン</a>
          </div>

          <div className="field">
            <input
                  type="email"
                  name="email1"
                  placeholder="メールアドレス"/>
          </div>

          <div className="field">
            <input
                  type="password"
                  name="pass1"
                  placeholder="パスワード"/>
          </div>

          <div className="ui error message"></div>
          <button className="ui button btn-link btn-orange" type="submit">ログイン</button>

          <div className='field'>
            <a className='text-forget-pass center' href={this.props.url}>パスワードをお忘れの方はこちら</a>
          </div>

        </form>

    )
  }
}

export default LoginForm;
