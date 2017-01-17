import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import {bankList, bankAccountTypes} from '../../flux/modules/constant'

import 'semantic-ui-form/form.min.css'
import 'semantic-ui-dropdown/dropdown.min.css'
import '../../css/bank-forms/BankAccountForm.css';


$.fn.form = require('semantic-ui-form')
$.fn.dropdown = require('semantic-ui-dropdown')

class BankAccountForm extends Component {
  static propTypes = {
    data: PropTypes.shape({
      bankName: PropTypes.string,
      accountType: PropTypes.string,
      branchCode: PropTypes.string,
      number: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    }).isRequired,
    isSaving: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form, bankNameSelector, accountTypeSelector} = this.refs
    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })

    // setup dropdown
    $(bankNameSelector).dropdown({
      allowAdditions: true
    })

    $(accountTypeSelector).dropdown({
    })

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

  renderSelector({selector, name, title, hint, multiple, addition, items=[]}) {
      const classes = classNames({
        'ui search selection dropdown': true,
        'multiple': multiple
      })

      return (
        <div className="field field-input">
         <label>{title}<p className='required'>※必須</p></label>
         <div className={classes} ref={selector}>
            <input type='hidden' name={name} />
            <i className='dropdown icon'></i>
            <div className='default text'>{hint}</div>
            <div className='menu'>
            {
              items.map(t => (
                <div key={t.id} className="item" data-value={t.label}>{t.label}</div>
              ))
            }
            </div>
         </div>
         </div>
      )
    }

  render() {

    const btnTitle = this.props.isSaving ? '保存中' : '保存'

    return (
      <form className="ui form bank-account-form" ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>

        {/*TODO: fix field  here @Tien co tien!!!*/}

        {/* bank name selection */}
        {this.renderSelector({
          'selector': 'bankNameSelector',
          'name': 'bankName',
          'title': '銀行',
          'hint': '銀行名を入力し、選択してください',
          'items': bankList,
          'multiple': false,
          'addition': true
        })}

        {/* bank account type selection */}
        {this.renderSelector({
          'selector': 'accountTypeSelector',
          'name': 'accountType',
          'title': '口座種別',
          'hint': '選択してください',
          'items': bankAccountTypes,
          'multiple': false,
          'addition': false,
        })}

        <div className="field">
          <label>支店コード<p className='required'>※必須</p></label>
          <input name="branchCode" placeholder="例) 123 (数字3桁)" type="text"/>
        </div>

        <div className="field">
          <label>口座番号<p className='required'>※必須</p></label>
          <input name="number" placeholder="例) 1234567 (数字7桁)" type="text" />
        </div>

        <div className="field">
          <label>口座名義(セイ)<p className='required'>※必須</p></label>
          <input name="lastName" placeholder="例) ヤマダ" type="text" />
        </div>

        <div className="field">
          <label>口座名義(メイ)<p className='required'>※必須</p></label>
          <input name="firstName" placeholder="例) アヤ" type="text" />
        </div>

        <div className='text-note'>
          <p>※口座番号が7桁未満の場合は先頭に0をつけてください</p>
          <p>※振込先が間違っている場合、再振り込み手数料が210円発生します</p>
        </div>

      <div className="ui error message"></div>
      <button className="ui button btn-orange btn-left" type="submit">{btnTitle}</button>
      </form>
    )
  }
}

export default BankAccountForm
