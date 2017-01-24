import React, {Component, PropTypes} from 'react';
import '../css/EditableAvatar.css';

import AvatarEditor from 'react-avatar-editor'
import {isSupport, canvasToDataUrl, localFileToDataUrl} from '../helpers/canvas'

class EditableAvatar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLocalImageDataUrl: null,
      isSupport: true,
    }
  }

  componentDidMount() {
    const support = isSupport()
    if (!support) {
      this.setState({
        isSupport: false
      })
    }
  }

  static propTypes = {
    avatarUrl: PropTypes.string,
    defaultAvatarUrl: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  }

  handleSelectedLocalFile(e) {
     e.preventDefault();

     let file = e.target.files[0]

     localFileToDataUrl(file, (url)=>{
        this.setState({
          selectedLocalImageDataUrl: url,
          selectedLocalImage: file
        })
     })
  }

  openFileDialog(e) {
    const {fileUpload} = this.refs
    fileUpload.click()
  }

  onClickSave () {
    // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
    // drawn on another canvas, or added to the DOM.
    const canvas = this.editor.getImage()

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    const canvasScaled = this.editor.getImageScaledToCanvas()

    const url = canvasToDataUrl(canvasScaled)

    this.props.onSubmit(url)
  }

  setEditorRef (editor) {
    if (editor) this.editor = editor
  }

  render() {
    const {isSupport} = this.state
    if (!isSupport) {
      return (<div className='editable-avatar'>
        <img className='ui image' src={'/img/notsupport.png'}/>
      </div>)
    }

    const {selectedLocalImageDataUrl} = this.state
    const avatarUrl = selectedLocalImageDataUrl
                    || this.props.avatarUrl
                    || this.props.defaultAvatarUrl
    return (
      <div className='editable-avatar'>
        <AvatarEditor
                image={avatarUrl}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                ref={this.setEditorRef.bind(this)}
              />
        <button className='ui orange button'
          onClick={(e)=>{ this.openFileDialog(e)}}>
        Change
        </button>
        <input
          ref="fileUpload"
          type="file"
          style={{"display" : "none"}}
          onChange={(e)=>{this.handleSelectedLocalFile(e)}}/>

        <button className='ui green button'
          onClick={(e)=>{ this.onClickSave(e)}}>
        Save
        </button>

      </div>
    )
  }
}

export default EditableAvatar;