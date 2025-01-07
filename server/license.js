const tencentcloud = require('tencentcloud-sdk-nodejs');
const { getCredential } = require('./credential');

async function license() {
  const credential = await getCredential();

  const {
    TmpSecretId: secretId,
    TmpSecretKey: secretKey,
    Token: token,
  } = credential;

  const cloudapp = new tencentcloud.cloudapp.v20220530.Client({
    credential: { secretId, secretKey, token },
    region: 'ap-guangzhou',
    profile: {
      httpProfile: {
        endpoint: 'cloudapp.internal.tencentcloudapi.com',
        protocol: 'https://',
      },
    },
  });

  const result = await cloudapp.VerifyLicense();
  console.log('license 校验结果 \n', JSON.stringify(result, null, '  '))
}

module.exports = { license }