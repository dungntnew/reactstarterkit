import $ from 'jquery';
import React, {PropTypes, Component} from 'react';

import 'semantic-ui-form/form.min.css'
import '../css/CreditCard.css';


$.fn.form = require('semantic-ui-form')


class CreditCard extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    password: PropTypes.number.isRequired,
    exprMonth: PropTypes.object.isRequired,
    exprYear: PropTypes.object.isRequired
  }

  createCard(event) {
    event.preventDefault();
    const card = {
      number: this.number.value,
      exprMonth: this.exprMonth.value,
      exprYear: this.exprYear.value,
      password: this.password.value,
    }
    this.props.addCard(card);
    this.cardForm.reset();
  }

  rennder() {

    return(
      <div className='credit-card'>
        <h2>お支払い方法</h2>
        <form className='ui form segment' onSubmit={(e) => this.createCard(e)} ref={(input => this.cardForm = input)}>

          <div className='field'>
            <label>カード番号<span>※必須</span></label>
            <input
                placeholder='半角数字のみ'
                type='number'
                ref={(input => this.number = input)}/>
          </div>

          <div className='list-card'>
            <Listcard/>
          </div>

          <div className='two fields'>
            <label>有効期限<span>※必須</span></label>
            <div className='field'>
              <label>月</label>
              <input
                  type="text"
                  ref={(input => this.exprMonth = input)}/>
            </div>

            <div className='field'>
              <label>日</label>
              <input
                  type="text"
                  ref={(input => this.exprYear = input)}/>
            </div>
          </div>

          <div className='field'>
            <label>セキュリティコード<span>※必須</span></label>
            <input
              placeholder='カード背面4桁もしくは3桁の番号'
              type='password'
              ref={(input => this.password = input)}/>
          </div>

          <p className='not-text'>セキュリティコードとは</p>

          <button className='ui button btn-orange'>次へ進む</button>

        </form>

      </div>

    )
  }
}




export default CreditCard;
