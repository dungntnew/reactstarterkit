import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/event-edit-forms/EventConfirmForm.css';


$.fn.form = require('semantic-ui-form')

class EventConfirmForm extends Component {
  constructor(props) {
    super(props)
  }

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
    const {form} = this.refs
    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
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

  render() {
    return (
      <form className="ui form event-confirm-form" ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>

      <div className="fields">

        <div className="field">
          <label>confirm -1</label>
          <input name="confirm-1" type="text"/>
        </div>

        <div className="field">
          <label>confirm -2</label>
          <input name="confirm-2" type="text" />
        </div>
      </div>

      <div className="ui error message"></div>
      <button className="ui button btn-orange " type="submit">{this.props.btnTitle}</button>
      </form>
    )
  }
}

export default EventConfirmForm
