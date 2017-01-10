
import React, {PropTypes, Component} from 'react'

import 'semantic-ui-form/form.min.css'
import '../../css/credit-card/RegisterProfile.css';


class RegisterProfile extends Component {
  static propTypes = {
    memberName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    passwordConfirm: PropTypes.string.isRequired
  }


  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setSate({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.addForm.reset();

  }

  render() {
    return (
      <div className='ui text container-customize register-profile' >
        <div className='ui segment centered'>
          <h2 className='center'>会員情報入力</h2>
          <form className='ui form segment form-create'
                ref={(input => this.addForm = input)}
                onSubmit={this.handleSubmit} >
            <div className='field field-input'>
              <label>ニックネーム<span>※必須</span></label>
                <input
                    onChange={this.handleChange}
                    placeholder='例) メルカリ太郎'
                    type='text'
                    ref={(input => this.memberName = input)}
                    />
            </div>

              <div className='field field-input'>
                <label>メールアドレス<span>※必須</span></label>
                  <input
                      onChange={this.handleChange}
                      placeholder='PC・携帯どちらでも可'
                      type='email'
                      ref={(input => this.email = input)}
                      />
              </div>

              <div className='field field-input'>
                <label>パスワード<span>※必須</span></label>
                  <input
                      onChange={this.handleChange}
                      placeholder='６文字以上'
                      type='password'
                      ref={(input => this.password = input)}
                      />
              </div>

              <div className='field field-input'>
                <label>パスワード(確認)<span>※必須</span></label>
                  <input
                      onChange={this.handleChange}
                      placeholder='６文字以上'
                      type='password'
                      ref={(input => this.passwordConfirm = input)}
                      />
              </div>
            <p className='center not-text'>すでにユーザー登録済みです</p>
            <button className='ui button btn-link btn-orange'>次へ進む</button>
          </form>
        </div>
      </div>

    );
  }
}


export default RegisterProfile
