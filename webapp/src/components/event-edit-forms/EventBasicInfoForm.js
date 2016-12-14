import $ from 'jquery';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/event-edit-forms/EventBasicInfoForm.css';

import TargetSelector from '../../containers/TargetSelector';

$.fn.form = require('semantic-ui-form')

class EventBasicInfoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeFields: {
        'target': false
      },
      fieldValues: {
        target: 'xxx'
      }
    }
  }

  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      coverImage: PropTypes.object,
      eventItems: PropTypes.arrayOf(PropTypes.object),
      target: PropTypes.string,
      category: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      detail: PropTypes.string,

    }).isRequired,
    targetItems: PropTypes.arrayOf(PropTypes.object),
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

  renderCoverImage() {
    return (
      <div className="field">
        <label>カバー写真</label>
        <input name="coverImage" type="file" />
      </div>
    )
  }

  renderEventImageList() {
    return (
      <div>
      <label>サブー写真</label>
      <div className="fields">
          <input name="eventImages[]" type="file" />
          <input name="eventImages[]" type="file" />
          <input name="eventImages[]" type="file" />
          <input name="eventImages[]" type="file" />
      </div>
      </div>
    )
  }

  setActiveField(field) {
    this.setState({
      activeFields: {
        target: field === 'target',
        other: field === 'other'
      }
    })
  }

  renderTargetSelectors() {

    const {form} = this.refs

    const selectedTargetIds = this.state.fieldValues.target ?
                              [this.state.fieldValues.target]: []
    const {targetItems, fetching} = this.props

    const targetInput = this.state.activeFields.target ? (
      <TargetSelector
        items={targetItems}
        selectedIds={selectedTargetIds}
        fetching={fetching}
        placeHolderText='Type to filter'
        loadingText='loading target'
        onClose={()=>{this.setActiveField()}}
        onChange={(targets) => {
          $(form).form('set value', 'target', targets[0])
        }}
      />
    )
    :
    (<input type='text' name='target'
            value={this.state.fieldValues.target}
            onClick={()=>{this.setActiveField('target')}}
     />)

    return (
      <div className="field">
        <label>目的</label>
        {targetInput}
      </div>
    )
  }

  renderFormErrors() {
    return (
      <div className="ui error message"></div>
    )
  }

  render() {

    return (
      <form className="ui form event-basic-info-form" ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>

      <div className="field">
        <label>テーブル名</label>
        <input name="title" type="text"/>
      </div>

      {this.renderCoverImage()}
      {this.renderEventImageList()}
      {this.renderTargetSelectors()}

      <button className="ui button" type="submit">{this.props.btnTitle}</button>
      </form>
    )
  }
}


// TODO: check where should use TargetSelector or ? semantic-ui selector
export default EventBasicInfoForm
