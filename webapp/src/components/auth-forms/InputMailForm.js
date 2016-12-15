import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
//import classNames from 'classnames';
// default fields validations,
// ignore this, setup late is OK
//import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/auth-forms/InputMailForm.css';

$.fn.form = require('semantic-ui-form')

class InputMailForm extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    data: PropTypes.shape({
      //todo
    }).isRequired,
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
        <form className='ui form input-mail-form' ref='form'
              onSubmit={(e) => {
                e.preventDefault()
               this.handleSubmit()
              }}>

          <h2 className='tite-form center'>パスワードをお忘れの方</h2>

          <div className="field">
            <input
                  type="email"
                  name="email1"
                  placeholder="メールアドレス"/>
          </div>

          <div className="ui error message"></div>

           <div className='field'>
            <p className='note center'>ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。</p>
          </div>
          <button className="ui button btn-link btn-orange" type="submit">送信する</button>

        </form>

    )
  }
}

export default InputMailForm;
