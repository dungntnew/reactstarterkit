import $ from 'jquery'
import React, {Component, PropTypes} from 'react'
import {defaultRules} from '../../helpers/validations'


import 'semantic-ui-form/form.min.css'
import '../../css/bills/BillCreateForm.css'

$.fn.form = require('semantic-ui-form')


class BillCreateForm extends Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    amount: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initForm()
  }

  initForm() {
    const {form} = this.refs
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
        <div className='ui text container segment bill-greate-form'>
            <h2 className='title'>振込申請金額を入力</h2>
            <form className='ui form bill-form' ref='form'
                onSubmit={(e) => {
                e.preventDefault()
                this.handleSubmit()
                }}>
              <div className='field field-input'>
                <label>振込申請金額<span>※必須</span></label>
                  <input
                      placeholder='例) ¥ 1,234'
                      type='text'
                      ref={(input => this.amount = input)}
                      />
              </div>

              <p className='mind'>振込金額は211円から可能で、1万円未満は振込手数料が210円かかります</p>

              <p className='text'>振込み申請は土曜日締切の翌週金曜日支払いになります</p>

              <div className='btn-sub'>
                <button className='ui button btn-orange btn-width' type="submit">確認する</button>
              </div>
              <p className='text-note'>※主催したテーブルで、ステータスが未完了のテーブルがあります。</p>
              <p className='text-note'> ステータスを完了に変更し、振込金額申請を行ってください。</p>
              <div className='btn-sub'>
                <a className='ui button btn-black btn-width' href={this.props.url}>過去テーブル一覧へ</a>
              </div>

            </form>
        </div>
      )
  }
}

export default BillCreateForm
