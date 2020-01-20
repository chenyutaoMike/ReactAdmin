import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
/**
 * 用来指定商品详情的富文本编辑器组件
 */

class RichTextEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }

  constructor(props) {
    super(props)
    const { detail } = this.props
    //如果有detail传递过来，证明就是点击详情进来的，如果没有，就是点击添加进来的
    if (detail) {
      const contentBlock = htmlToDraft(detail)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState,
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty() //创建一个没有内容的编辑对象
      }
    }
  }

  /**
   * 输入过程中实时的回调
   */
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }
  /**
   * 返回输入数据对应的html格式的文本
   */
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/manage/img/upload')
        const data = new FormData()
        data.append('image', file)
        xhr.send(data)
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText)
          const url = response.data.url //得到图片的Url
          resolve({ data: { link: url } })  //关键代码
        })
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText)
          reject(error)
        })
      }
    );
  }


  render() {
    const { editorState } = this.state;
    return (

      <Editor
        editorState={editorState}
        editorStyle={{ border: '1px solid black', minHeight: '200px', paddingLeft: '10px' }}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    )
  }
}



export default RichTextEditor
