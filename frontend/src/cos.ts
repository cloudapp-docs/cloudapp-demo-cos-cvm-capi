import COS from 'cos-js-sdk-v5';

// console.log(COS.version);  sdk 版本需要不低于 1.8.3

// 上传文件，file为选择的文件
export function upload(file: any, Bucket: string, Region: string) {
  // stsUrl 是上方搭建的临时密钥服务
  const stsUrl = `/getTempCredentials`;
  return new Promise((resolve, reject) => {
      fetch(stsUrl)
        .then(response => response.json())
        .then(data => {
          // 服务端接口需要返回：上传的存储桶、地域、随机路径的对象键、临时密钥
          console.log('临时密钥:', data);
          // 在返回值里取临时密钥信息，上传的文件路径信息
          const {
            TmpSecretId,
            TmpSecretKey,
            Token,
            ExpiredTime,
          } = data.Response.Credential;
          // 创建 JS SDK 实例，传入临时密钥参数
          // 其他配置项可参考下方 初始化配置项
          const cos = new COS({
            SecretId: TmpSecretId,
            SecretKey: TmpSecretKey,
            SecurityToken: Token,
            ExpiredTime,
          });
          // 上传文件
          cos.uploadFile({
            Bucket: Bucket,
            Region,
            Key: file.name,
            Body: file, // 要上传的文件对象。
            onProgress: function(progressData) {
              console.log('上传进度：', progressData);
            }
          }, function (err, data) {
            console.log('上传结束', err || data);
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        }).catch(error => {
          console.error('获取上传路径和临时密钥失败', error);
          reject(error);
        });
  });
}