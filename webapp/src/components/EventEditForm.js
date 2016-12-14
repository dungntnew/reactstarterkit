import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import '../css/EventEditForm.css';

import EventEditSteps from './EventEditSteps'

class EventEditForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 0
    }
  }

  static propTypes = {
    event: PropTypes.shape({
      // todo
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  static stepTitles = ['基本情報', '住所アクセス', '定型文', '規約', '公開']
  static STEP_COUNT = 5

  renderSteps() {
    const stepMap = EventEditForm.stepTitles.map((val, index) => ({
      title: val,
      completed: this.state.step > index,
      active: this.state.step === index
    }))
    return (
      <EventEditSteps steps={stepMap}/>
    )
  }

  validate() {
    // validate all form
    return true
  }

  validateStep(step) {
    // validate step i
    return true
  }

  nextStep() {
    const {step} = this.state

    if (!this.validateStep(step)) {
      return;
    }
    if (step < EventEditForm.STEP_COUNT - 1) {
      this.setState({
        step: step + 1
      })
    }
    else {
      if (this.validate()) {
        this.execSubmit()
      }
    }
  }

  execSubmit() {
    console.log("do submit!")

    this.props.onSave({})
  }

  renderNextButton() {
    const {step} = this.state
    const btnTitle = step < EventEditForm.STEP_COUNT - 1? '次へ': '公開'

    return (
      <button className="ui button" type="button"
        onClick={(e)=>{this.nextStep()}}
      >{btnTitle}</button>
    )
  }

  render() {
    const {event} = this.props

    return (
      <div className='event-edit-form'>
            <form className="ui form">
              <div className="field">
                <label>First Name</label>
                <input type="text" name="first-name" placeholder="First Name"/>
              </div>
              <div className="field">
                <label>Last Name</label>
                <input type="text" name="last-name" placeholder="Last Name"/>
              </div>
              <div className="field">
                <div className="ui checkbox">
                  <input type="checkbox" tabIndex="0" className="hidden"/>
                  <label>I agree to the Terms and Conditions</label>
                </div>
              </div>
              <button className="ui button" type="submit">Submit</button>
              {this.renderNextButton()}
            </form>
            {this.renderSteps()}
      </div>
    )
  }
}

export default EventEditForm
