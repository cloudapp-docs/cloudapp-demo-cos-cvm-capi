import React, { useState } from 'react';
import { Upload, Button, Text } from 'tea-component';
import { upload } from './cos';

interface SingleFileUploadProps {
  isValidate: boolean;
}

export function SingleFileUpload({ isValidate }: SingleFileUploadProps) {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean | undefined>();

  async function handleUpload(file: any) {
    const response: any = await fetch('/getCosBucket');
    const bucketResult = await response.json();
    const { cosBucket, cosBucketInvalidate, region } = bucketResult.Response;
    await upload(file, isValidate ? cosBucket : cosBucketInvalidate, region);
  }
  
  function handleStart() {
    setUploading(true);
  }

  async function handleSuccess(result: any, { file }: any) {
    setFileList((fileList) => [
      ...fileList,
      { name: file.name, status: 'success' },
    ]);
    setUploading(false);
  }

  function handleError(error: any, { file }: any) {
    setFileList((fileList) => [
      ...fileList,
      { name: file.name, status: 'danger' },
    ]);
    setUploading(false);
    console.error(error);
  }

  return (
    <>
      <Upload
        onStart={handleStart}
        onSuccess={handleSuccess}
        beforeUpload={handleUpload}
        onError={handleError}
      >
        <Button loading={uploading}>点击上传</Button>
      </Upload>
      {!!fileList.length && <hr />}
      {fileList.map((file, index) => (
        <p key={index}>
          <Text theme={file.status}>{file.name}</Text>
        </p>
      ))}
    </>
  );
}
