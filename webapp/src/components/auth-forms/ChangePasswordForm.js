import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/ChangePasswordForm.css';

$.fn.form = require('semantic-ui-form')

class ChangePasswordForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form} = this.refs

    // setup validations
    $(form).form({
      on: 'blur',
      fields: defaultRules
    })
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
        <form className='ui large form change-password-form' ref='form'
              onSubmit={(e) => {
                e.preventDefault()
               this.handleSubmit()
              }}>
          <div className='ui segment'>
            <h2 className='tite-form center'>新しいパスワードの設定</h2>

            <div className="field">
              <input
                    type="password"
                    name="currentPassword"
                    placeholder="現在のパスワードを入力してください（６文字以上）"/>
            </div>
            <div className="field">
              <input
                    type="password"
                    name="newPassword1"
                    placeholder="新しいパスワードを入力してください（６文字以上）"/>
            </div>
            <div className="field">
              <input
                    type="password"
                    name="newPassword2"
                    placeholder="再度新しいパスワードを入力してください（６文字以上）"/>
            </div>
            <div className="ui error message"></div>
            <button className="ui button btn-link btn-orange" type="submit">新しいパスワードを保存する</button>
          </div>

        </form>

    )
  }
}

export default ChangePasswordForm;
