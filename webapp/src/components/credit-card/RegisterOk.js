
import React, {PropTypes, Component} from 'react'

import 'semantic-ui-form/form.min.css'
import '../../css/credit-card/RegisterOk.css';


class RegisterOk extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    urlRegister: PropTypes.string.isRequired

  }

  render() {
    return (

      <div className='ui text container-customize register-ok'>
        <div className='ui segment centered content'>
          <h2 className='center'>パスワードをお忘れの方</h2>
          <p className='text-comfirm center'>登録ありがとうございます！</p>
          <p className='text-comfirm center'>あなたが出会うたくさんのおいしいに幸あれ♪</p>

          <a className='ui button btn-link btn-orange' href={this.props.url}>次へ進む</a>
          <p className='text-link center'>続けてお支払い方法を登録する方はコチラ
              <a href={this.props.urlRegister}>コチラ</a></p>
        </div>
      </div>
    );
  }
}
export default RegisterOk
