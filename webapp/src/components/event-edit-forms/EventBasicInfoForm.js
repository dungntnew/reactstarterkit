import _ from 'lodash'
import $ from 'jquery';
import 'moment';
import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';

import {defaultRules} from '../../helpers/validations'

import 'semantic-ui-form/form.min.css'
import '../../css/event-edit-forms/EventBasicInfoForm.css';

import TargetSelector from '../../containers/TargetSelector';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

$.fn.form = require('semantic-ui-form')

class EventBasicInfoForm extends Component {
  constructor(props) {
    super(props)

    const {data} = props
    const {registerStartDate, registerEndDate} = data
    const {eventStartDate, eventEndDate} = data

    this.state = {
      registerStartDate,
      registerEndDate,
      eventStartDate,
      eventEndDate,
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
    const {
      form,
      targetSelector,
      genreSelector,
      supplementSelector,
      placeTypeSelector,
      tagSelector,
      dressCodeSelector,
      registerStartTimeSelector,
      registerEndTimeSelector,
      eventStartTimeSelector,
      eventEndTimeSelector} = this.refs

    const {data} = this.props

    // setup validations
    $(form).form({
        on: 'blur',
        fields: defaultRules
    })
    // setup dropdowns
    const selectors = [
      targetSelector,
      genreSelector,
      supplementSelector,
      placeTypeSelector,
      dressCodeSelector,
      eventStartTimeSelector,
      eventEndTimeSelector,
      registerStartTimeSelector,
      registerEndTimeSelector
    ]
    selectors.forEach((s) => $(s).dropdown())

    // setup dropdowns with addtions
    $(tagSelector).dropdown({
      allowAdditions: true
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
      const formData = Object.assign({}, cleaned, {
        registerStartDate: this.state.registerStartDate,
        registerEndDate: this.state.registerEndDate,
        eventStartDate: this.state.eventStartDate,
        eventEndDate: this.state.eventEndDate,
      })

      console.log(formData)

      // submit data
      this.props.onSubmit(formData)
    }
  }

  renderSelector({selector, name, title, hint, multiple, addition, items=[]}) {
      const classes = classNames({
        'ui search selection dropdown': true,
        'multiple': multiple
      })

      return (
        <div className="field">
         <label>{title}</label>
         <div className={classes} ref={selector}>
            <input type='hidden' name={name} />
            <i className='dropdown icon'></i>
            <div className='default text'>{hint}</div>
            <div className='menu'>
            {
              items.map(t => (
                <div key={t.id} className="item" data-value={t.id}>{t.label}</div>
              ))
            }
            </div>
         </div>
         </div>
      )
    }

  renderEventTitle() {
    return (
      <div className="field">
        <label>テーブル名</label>
        <input name="title" type="text"/>
      </div>
    )
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

  renderTags() {
    return (
      <div></div>
    )
  }

  renderEventDetail() {
    return (
      <div className="field">
          <label>テーブル詳細</label>
          <textarea name="detail" rows="5"></textarea>
      </div>
    )
  }

  renderTimeSelectorField(name, selector, hint='時間') {
    const timeRange = _.range(1, 24, 1)
    const timeKeys = timeRange.map(function(t){ return Math.floor(t) + ":" + _.padEnd((t * 60 % 60), 2, "0") })
    const timeMaps = timeKeys.map(t => ({id: t, label: t}))

    return (
      <div className="field">
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

  renderRegisterStartDateTime() {
    const {registerStartDate, registerEndDate} = this.state

    return (
      <div className="inline fields">

          <label>申し込み開始</label>
          <div className='field'>
          <DatePicker
            locale='ja'
            todayButton='本日'
            className='date-selector'
            selected={registerStartDate}
            selectsStart
            startDate={registerStartDate}
            endDate={registerEndDate}
            onChange={(val) => {this.setState({registerStartDate: val})}}
          />
          </div>
          {this.renderTimeSelectorField('registerStartTime', 'registerStartTimeSelector')}
      </div>
    )
  }

  renderRegisterEndDateTime() {
    const {registerStartDate, registerEndDate} = this.state

    return (
      <div className="inline fields">

          <label>申し込み終了</label>
          <div className='field'>
          <DatePicker
            locale='ja'
            todayButton='本日'
            className='date-selector'
            selected={registerEndDate}
            selectsEnd
            startDate={registerStartDate}
            endDate={registerEndDate}
            onChange={(val) => {this.setState({registerEndDate: val})}}
          />
          </div>
          {this.renderTimeSelectorField('registerEndTime', 'registerEndTimeSelector')}
      </div>
    )
  }


  renderOpenStartDateTime() {
    const {eventStartDate, eventEndDate} = this.state

    return (
      <div className="inline fields">

          <label>開始</label>
          <div className='field'>
          <DatePicker
            locale='ja'
            todayButton='本日'
            className='date-selector'
            selected={eventStartDate}
            selectsStart
            startDate={eventStartDate}
            endDate={eventEndDate}
            onChange={(val) => {this.setState({eventStartDate: val})}}
          />
          </div>
          {this.renderTimeSelectorField('eventStartTime', 'eventStartTimeSelector')}
      </div>
    )
  }

  renderOpenEndDateTime() {
    const {eventStartDate, eventEndDate} = this.state

    return (
      <div className="inline fields">

          <label>終了</label>
          <div className='field'>
          <DatePicker
            locale='ja'
            todayButton='本日'
            className='date-selector'
            selected={eventEndDate}
            selectsEnd
            startDate={eventStartDate}
            endDate={eventEndDate}
            onChange={(val) => {this.setState({eventEndDate: val})}}
          />
          </div>
          {this.renderTimeSelectorField('eventEndTime', 'eventEndTimeSelector')}
      </div>
    )
  }

  renderEntryFee() {
    return (
      <div className="field">
        <label>金額</label>
        <input name="entryFee" type="text"/>
      </div>
    )
  }

  renderInstarHastag() {
    return (
      <div className="field">
        <label>インスタグラ設定</label>
        <input name="instarHashTag" type="text"/>
      </div>
    )
  }

  renderFormErrors() {
    return (
      <div className="ui error message"></div>
    )
  }

  render() {
    const {
      targetItems,
      genreItems,
      dressCodeItems,
      supplementItems,
      placeTypeItems
    } = this.props

    return (
      <form className="ui form event-basic-info-form" ref='form'
             onSubmit={(e) => {
               e.preventDefault()
               this.handleSubmit()
            }}>

      {this.renderEventTitle()}
      {this.renderCoverImage()}
      {this.renderEventImageList()}
      {this.renderSelector({
        'selector': 'targetSelector',
        'name': 'target',
        'title': '目的',
        'hint': '目的を選択してください',
        'items': targetItems
      })}
      {this.renderSelector({
        'selector': 'genreSelector',
        'name': 'genre',
        'title': 'ジェンル',
        'hint': 'ジェンルを選択してください',
        'items': genreItems
      })}
      {this.renderSelector({
        'selector': 'tagSelector',
        'name': 'tags',
        'title': 'タグ',
        'hint': 'タグを入力してください',
        'items': [],
        'multiple': true,
        'addition': true
      })}

      {this.renderEventDetail()}
      {this.renderRegisterStartDateTime()}
      {this.renderRegisterEndDateTime()}

      {this.renderOpenStartDateTime()}
      {this.renderOpenEndDateTime()}

      {this.renderEntryFee()}
      {this.renderSelector({
        'selector': 'dressCodeSelector',
        'name': 'dressCodes',
        'title': 'ドレスコード',
        'hint': 'ドレスコードを選択してください',
        'items': dressCodeItems,
        'addition': true
      })}
      {this.renderSelector({
        'selector': 'placeTypeSelector',
        'name': 'placeType',
        'title': '会場の種類',
        'hint': '会場の種類を選択してください',
        'items': placeTypeItems,
      })}
      {this.renderSelector({
        'selector': 'supplementSelector',
        'name': 'supplements',
        'title': '補足',
        'hint': '補足を選択してください',
        'items': supplementItems,
        'multiple': true
      })}
      {this.renderInstarHastag()}

      <button className="ui button" type="submit">{this.props.btnTitle}</button>
      </form>
    )
  }
}


export default EventBasicInfoForm
