import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import '../css/EventEditForm.css';

import EventEditSteps from './event-edit-forms/EventEditSteps'
import EventBasicInfoForm from './event-edit-forms/EventBasicInfoForm'
import EventAddressForm from './event-edit-forms/EventAddressForm'
import EventNoteTextForm from './event-edit-forms/EventNoteTextForm'
import EventTermForm from './event-edit-forms/EventTermForm'
import EventConfirmForm from './event-edit-forms/EventConfirmForm'

import {getTargetItems, 
       getGenreItems, 
       getPlaceTypeItems, 
       getDressCodeItems, 
       getSupplementItems, 
       getPrefectureItems} from '../flux/modules/resource'


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

  nextStep(cleanedData) {

    const {step} = this.state
    console.log('submit data: ', cleanedData, 'at step: ', step)

    if (step < EventEditForm.STEP_COUNT - 1) {
      this.execSaveChange(cleanedData, step);
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

  execSaveChange(data, step) {
    this.props.onChange(data);
  }

  execSubmit(data) {
    this.props.onSave();
  }

  renderFormPerStep() {
    //const {event} = this.props
    const {step} = this.state

    const data = {
      title: '',
      target: '',
      coverImage: null,
      eventItems: [],
      category: '',
      tags: [],
      detail: ''
    }

    const btnTitle = step < EventEditForm.STEP_COUNT - 1? '次へ': '公開'

    if (step === 0) {
      return <EventBasicInfoForm
                 btnTitle={btnTitle}
                 data={data}
                 targetItems={this.props.targetItems}
                 genreItems={this.props.genreItems}
                 supplementItems={this.props.supplementItems}
                 placeTypeItems={this.props.placeTypeItems}
                 dressCodeItems={this.props.dressCodeItems}
                 onSubmit={(cleaned) => this.nextStep(cleaned)}
      />
    }
    if (step === 1) {
      return <EventAddressForm
                       btnTitle={btnTitle}
                       data={data}
                       prefectures={this.props.prefectures}
                       onSubmit={(cleaned) => this.nextStep(cleaned)}
      />
    }
    if (step === 2) {
      return <EventNoteTextForm
                             btnTitle={btnTitle}
                             data={data}
                             onSubmit={(cleaned) => this.nextStep(cleaned)}
      />
    }
    if (step === 3) {
      return <EventTermForm
                            btnTitle={btnTitle}
                            data={data}
                            onSubmit={(cleaned) => this.nextStep(cleaned)}
      />
    }
    if (step > 3) {
      return <EventConfirmForm
                            btnTitle={btnTitle}
                            data={data}
                            onSubmit={(cleaned) => this.nextStep(cleaned)}
      />
    }
  }

  render() {
    return (
      <div className='ui text container event-edit-form'>
        {this.renderSteps()}
        {this.renderFormPerStep()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    targetItems: getTargetItems(state),
    genreItems: getGenreItems(state),
    placeTypeItems: getGenreItems(state),
    dressCodeItems: getDressCodeItems(state),
    supplementItems: getSupplementItems(state),
    prefectures: getPrefectureItems(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(EventEditForm)
