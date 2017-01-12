import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/credit-card/CreditCard.css';

$.fn.form = require('semantic-ui-form')

class CreditCard extends Component {
  static propTypes = {
    saving: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    data: PropTypes.shape({
      method: PropTypes.string,
      number: PropTypes.string,
      securityCode: PropTypes.string,
      exprMonth: PropTypes.string,
      exprYear: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form} = this.refs
    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })

   // setup dropdown

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

      // submit data
      this.props.onSubmit(Object.assign({},cleaned, {
        method: cleaned.method || 'クレジットカード'
      }))
    }
  }

  renderSaving() {
    return (
      <div>
      Saving..
      </div>
    )
  }

  renderInputFields() {
    return (
        <div>
            <div className='field field-input'>
              <label>カード番号<span>※必須</span></label>
              <input
                  placeholder='半角数字のみ'
                  type='text'
                  name='number'
                  />
            </div>

            <div className='list-card'>
            </div>

            <label>有効期限<span>※必須</span></label>
            <div className='two fields'>
              <div className='field field-input'>
                <input type="text"
                       name='exprMonth'
                />
              </div>
              <label>月</label>

              <div className='field field-input'>
                <input type="text"
                       name='exprYear'
                />
              </div>
              <label>日</label>
            </div>

            <div className='field field-input'>
              <label>セキュリティコード<span>※必須</span></label>
              <input
                placeholder='カード背面4桁もしくは3桁の番号'
                type='password'
                name='securityCode'
                />
            </div>

            <p className='not-text'>セキュリティコードとは</p>
            <button className='ui button btn-link btn-orange'>次へ進む</button>
        <div className="ui error message"></div>
      </div>
    )
  }

  render() {
    let content
    if (this.props.saving) {
      content = this.renderSaving()
    }
    else {
      content = this.renderInputFields()
    }

    return (
      <div className='ui text container-customize credit-card' >
        <div className='ui segment centered'>
          <h2 className='center'>お支払い方法</h2>
          <form className='ui form segment form-create'
                 ref='form'
                 onSubmit={(e) => {
                   e.preventDefault()
                   this.handleSubmit()
                }}>
           {this.props.errorMessage &&
           <div className="ui error message">{this.props.errorMessage}</div>
           }
           {content}
           </form>
        </div>
      </div>
    );
  }
}

export default CreditCard;
