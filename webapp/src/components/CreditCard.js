import $ from 'jquery';
import React, {PropTypes, Component} from 'react';

import 'semantic-ui-form/form.min.css'
import '../css/CreditCard.css';




class CreditCard extends Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    password: PropTypes.number.isRequired,
    exprMonth: PropTypes.object.isRequired,
    exprYear: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='ui text container credit-card' >
        <div className='ui segments centered'>
          <h2>お支払い方法</h2>
          <form className='ui form segment form-create' onSubmit={this.handleSubmit}>
            <div className='field'>
              <label>カード番号<span>※必須</span></label>
              <input
                  onChange={this.handleChange}
                  placeholder='半角数字のみ'
                  type='text'
                  ref={(input => this.number = input)}
                  />
            </div>

            <div className='list-card'>
            </div>

            <label>有効期限<span>※必須</span></label>
            <div className='two fields'>
              <div className='field'>
                <input
                    type="text"
                    ref={(input => this.exprMonth = input)}/>
              </div>
              <label>月</label>

              <div className='field'>
                <input
                    type="text"
                    ref={(input => this.exprYear = input)}/>
              </div>
              <label>日</label>
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
      </div>
    );
  }
}



export default CreditCard;
