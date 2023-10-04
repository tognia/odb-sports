import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export interface UploadImageProps {
  selectedImage: string;
  onImageUpdate: (e: any) => void;
}

const UploadImage: FC<UploadImageProps> = ({
  selectedImage,
  onImageUpdate,
  ...rest
}) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // setStateFile({ file: newFileList[newFileList.length - 1] });
    onImageUpdate(newFileList[newFileList.length - 1])
  }

  const uploadButton = (
    <>
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload Image</div>

      </div>
    </>
  );

  const styles = {
    h5: { fontSize: "25px" }
  }

  return (
    <>
      {
        selectedImage ? (
          <div>
            <Card bordered={true} style={{ width: 300 }} className="compet_card">
              <img
                className="compet_img"
                src={selectedImage}
                alt="Thumb"
              />
            </Card>
          </div>
        ) : null
      }
      <h5 style={styles.h5}>Image Preview</h5>

      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length >= 1 ? null : uploadButton}

      </Upload>


      <Modal
        visible={previewOpen}
        title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImage;