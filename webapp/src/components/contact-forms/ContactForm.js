import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import {contactCategories} from '../../flux/modules/constant'

import 'semantic-ui-form/form.min.css'
import 'semantic-ui-dropdown/dropdown.min.css'
import '../../css/contact-forms/ContactForm.css';


$.fn.form = require('semantic-ui-form')
$.fn.dropdown = require('semantic-ui-dropdown')

class ContactForm extends Component {
  static propTypes = {
    data: PropTypes.shape({
      category: PropTypes.string,
      text: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    isSending: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form, categorySelector} = this.refs
    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })

    // setup dropdown
    $(categorySelector).dropdown({})

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

    const btnTitle = this.props.isSending ? '送信中' : '送信'

    return (
      <form className="ui form contact-form" ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>

        {/* category selection */}
        {this.renderSelector({
          'selector': 'categorySelector',
          'name': 'category',
          'title': 'カテゴリー',
          'hint': 'カテゴリーを選択してください',
          'items': contactCategories,
          'multiple': false,
          'addition': false
        })}

        <div className="field">
          <label>メール<p className='required'>※必須</p></label>
          <input name="email" placeholder="example@gmail.com" type="text" />
        </div>


        <div className="field">
          <label>内容<p className='required'>※必須</p></label>
          <textarea name="text" placeholder="" rows={4}/>
        </div>

      <div className="ui error message"></div>
      <button className="ui button btn-orange btn-left" type="submit">{btnTitle}</button>
      </form>
    )
  }
}

export default ContactForm
