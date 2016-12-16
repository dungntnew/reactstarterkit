import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/event-edit-forms/EventTermForm.css';


$.fn.form = require('semantic-ui-form')

class EventTermForm extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    data: PropTypes.shape({
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
      <form className="ui form segments event-term-form " ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>

      <div className="fields">

        <div className="field">
          <label>term 1</label>
          <input name="term-1" type="text"/>
        </div>

        <div className="field">
          <label>term -2</label>
          <input name="term-2" type="text" />
        </div>
      </div>

      <div className="ui error message"></div>
      <button className="ui button btn-orange btn-left" type="submit">{this.props.btnTitle}</button>
      </form>
    )
  }
}

export default EventTermForm
