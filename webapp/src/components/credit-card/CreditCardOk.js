
import React, {PropTypes, Component} from 'react'

import 'semantic-ui-form/form.min.css'
import '../../css/credit-card/CreditCardOk.css';


class CreditCardOk extends Component {

  static propTypes = {
    onNext: PropTypes.func.isRequired,
  }

  render() {
    return (

      <div className='ui text container-customize creditcard-ok'>
        <div className='ui segment centered content'>
          <h2 className='center'>お支払い方法の登録完了</h2>
          <p className='text-comfirm center'>ありがとうございます。</p>
          <p className='text-comfirm center'>お支払い方法の登録が完了しました。</p>
          <a className='ui button btn-link btn-orange'
          onClick={() => this.props.onNext() }>次へ進む</a>
        </div>
      </div>
    );
  }
}
export default CreditCardOk
