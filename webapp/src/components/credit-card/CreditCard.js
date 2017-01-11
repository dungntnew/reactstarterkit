import $ from 'jquery';
import React, {PropTypes, Component} from 'react';

import 'semantic-ui-form/form.min.css'
import '../../css/credit-card/CreditCard.css';




class CreditCard extends Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    password: PropTypes.string.isRequired,
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
    this.addForm.reset();
  }

  render() {
    return (
      <div className='ui text container-customize credit-card' >
        <div className='ui segment centered'>
          <h2 className='center'>お支払い方法</h2>
          <form className='ui form segment form-create'
                ref={(input => this.addForm = input)}
                onSubmit={this.handleSubmit}>
            <div className='field field-input'>
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
              <div className='field field-input'>
                <input
                    type="text"
                    ref={(input => this.exprMonth = input)}/>
              </div>
              <label>月</label>

              <div className='field field-input'>
                <input
                    type="text"
                    ref={(input => this.exprYear = input)}/>
              </div>
              <label>日</label>
            </div>

            <div className='field field-input'>
              <label>セキュリティコード<span>※必須</span></label>
              <input
                placeholder='カード背面4桁もしくは3桁の番号'
                type='password'
                ref={(input => this.password = input)}/>
            </div>

            <p className='not-text'>セキュリティコードとは</p>
            <button className='ui button btn-link btn-orange'>次へ進む</button>
          </form>
        </div>
      </div>
    );
  }
}



export default CreditCard;
