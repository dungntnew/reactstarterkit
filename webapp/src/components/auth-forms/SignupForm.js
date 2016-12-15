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
        <form className='ui form signup-form'>

          <h2 className='tite-form center'>新規会員登録</h2>
          <div className='field'>
            <a className='ui button btn-link' href={this.props.facebookUrl}><i className=''></i>Facebookでログイン</a>
          </div>

          <div className='field'>
            <a className='ui button btn-link' href={this.props.goooleUrl}><i className=''></i>Google+でログイン</a>
          </div>

          <div className="line"></div>

          <div className='field'>
            <p className='note center'>登録することをもって私は、Airbnbのサービス利用規約、決済サービス利用規約、個人情報保護ポリシー、ゲスト返金ポリシー、ホスト保証規約に同意します。</p>
          </div>
        </form>
    )
  }
}

export default SignupForm;
