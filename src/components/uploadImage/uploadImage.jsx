// component use to upload image
import React from 'react';
import PropType from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {removePicture} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class UploadImage extends React.Component {
  static propTypes = {
    defaultValue : PropType.array
  }

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  // use to display the picture back
  constructor(props) {
    super(props)

    var fileList = []

    const {defaultValue} = this.props
    if(defaultValue && defaultValue.length > 0) {
      fileList = defaultValue.map((img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url:'http://localhost:41571/images/' + img
      }))
    }

    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // onchange, when the image is upload call this method
  handleChange = async ({ file, fileList }) => {
    // if successfully upload, status should be done
    this.setState({fileList})
    if(file.status === 'done') {
      const result = file.response
      if(result.status === 0) {
        message.success('successfully upload picture.')
        const {name, url} = result.data
        fileList[fileList.length - 1].name = name // reset the fileList attributes
        fileList[fileList.length - 1].url = url // reset the fileList attributes
      } else {
        message.error('upload picture failed')
      }
    }else if(file.status==='removed') {
      // when select the picutre, it will auto upload, if remove need call remove API
      const result = await removePicture(file.name)
      if(result.data.status === 0) {
        message.success('successfully remove picture.')
      }else {
        message.error('remove picture failed.')
      }
    }
  };

  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" // api to upload image, when select the picutre, it will auto upload
          accept='image/*' // only accept image
          name='image' // request name
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}