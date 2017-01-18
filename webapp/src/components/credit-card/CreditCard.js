import _ from 'lodash'
import $ from 'jquery';
import moment from 'moment';

import React, {PropTypes, Component} from 'react';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import 'semantic-ui-dropdown/dropdown.min.css'
import '../../css/credit-card/CreditCard.css';

$.fn.form = require('semantic-ui-form')
$.fn.dropdown = require('semantic-ui-dropdown')

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


  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form, monthSelector, yearSelector} = this.refs
    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })

   // setup dropdown
   $(monthSelector).dropdown({})
   $(yearSelector).dropdown({})

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

  renderSupportingCreditTypes(){
    return (
        <div className={"ui orange huge labels"}>
          <a className={"ui label"}>
            <i className={"american express icon"}></i>
          </a>
          <a className={"ui label"}>
            <i className={"japan credit bureau icon"}></i>
          </a>
          <a className={"ui label"}>
            <i className={"visa icon"}></i>
          </a>
          <a className={"ui label"}>
            <i className={"mastercard icon"}></i>
          </a>
        </div>
    )
  }

  renderTimeSelectorField(name, selector, from, to, hint='月') {
    const timeRange = _.range(from, to, 1)
    const timeKeys = timeRange.map(t => _.padStart(t, 2, '0'))
    const timeMaps = timeKeys.map(t => ({id: t, label: t}))

    return (
      <div className="field field-input">
       <div className='ui search selection dropdown' ref={selector}>
          <input type='hidden' name={name} />
          <i className='dropdown icon'></i>
          <div className='default text'>{hint}</div>
          <div className='menu'>
          {
            timeMaps.map(t => (
              <div key={t.id} className="item" data-value={t.id}>{t.label}</div>
            ))
          }
          </div>
       </div>
      </div>
    )
  }

  renderInputFields() {
    const currentYear = moment().year()

    return (
        <div>
            {this.renderSupportingCreditTypes()}
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
              {this.renderTimeSelectorField(
                'exprMoth',
                'monthSelector',
                1,
                12,
                '月')
              }
              {this.renderTimeSelectorField(
                'exprYear',
                'yearSelector',
                currentYear,
                currentYear + 20,
                '年')
              }
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
