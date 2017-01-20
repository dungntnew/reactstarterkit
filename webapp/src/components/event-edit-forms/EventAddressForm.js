import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/event-edit-forms/EventAddressForm.css';


$.fn.form = require('semantic-ui-form')

class EventAddressForm extends Component {

  static propTypes = {
    data: PropTypes.shape({
      // todo
    }).isRequired,
    btnTitle: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form, address1Selector} = this.refs
    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })

   // setup dropdown
   $(address1Selector).dropdown()

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

  renderZipCode() {
    return (
      <div className="field">
        <label>郵便番号<span className='required'>※必須</span><span className='note'>ハイフンなしの半角英数字。入力すると、住所が自動補完されます。</span></label>
        <input name="zipcode" type="text"/>
      </div>
    )
  }

  renderAddress1() {
    const {prefectures} = this.props
      return (
        <div className="field">
           <label>都道府県<span className='required'>※必須</span><span className='note'>外観や会場全体を表す画像をアップロードしてください。</span></label>
           <div className='ui search selection dropdown' ref='address1Selector'>
              <input type='hidden' name='address1' />
              <i className='dropdown icon'></i>
              <div className='default text'>都道府県</div>
              <div className='menu'>
              {
                prefectures.map(t => (
                  <div key={t.id} className="item" data-value={t.id}>{t.label}</div>
                ))
              }
              </div>
           </div>
         </div>
      )
  }

  renderAddress2() {
    return (
      <div className="field">
        <label>群市区町村<span className='required'>※必須</span><span className='note'>外観や会場全体を表す画像をアップロードしてください。</span></label>
        <input name="address2" type="text"/>
      </div>
    )
  }

  renderAddress3() {
    return (
      <div className="field">
        <label>番地・建物名・部屋番号</label>
        <input name="address3" type="text"/>
      </div>
    )
  }

  renderHowToAccess() {
    return (
      <div className="field">
        <label>アクセス<span className='note'>最寄り駅からの歩き方や高速道路の出口、所要時間などを入力してください。</span></label>
        <textarea name="howtoAccessText" rows='4'/>
      </div>
    )
  }

  render() {
    return (
      <form className="ui form segments event-address-form" ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>
      {this.renderZipCode()}
      {this.renderAddress1()}
      {this.renderAddress2()}
      {this.renderAddress3()}
      {this.renderHowToAccess()}

      <div className="ui error message"></div>
      <button className="ui button btn-orange btn-left" type="submit">{this.props.btnTitle}</button>
      </form>
    )
  }
}

export default EventAddressForm
