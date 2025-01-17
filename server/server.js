const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const tencentcloud = require('tencentcloud-sdk-nodejs');
const { getCredential } = require('./credential');
const { license } = require('./license');

function main() {
  const app = express();

  // 验证 license
  license();

  app.use('/public', express.static(path.join(__dirname, 'public')));


  app.use(async (req, res, next) => {
    res.on('finish', () =>
      console.log(
        `${new Date().toLocaleString('zh-cn')} ${req.method} ${
          req.originalUrl
        } ${res.statusCode}`
      )
    );
    await next();
  });
  app.use(bodyParser.json());

  app.use('/getTempCredentials', async (req, res) => {
    const Credential = await getCredential();
    res.send({ Response: { Credential } });
  });

  app.use('/getCosBucket', (req, res) => {
    res.send({ Response: {
      cosBucket: process.env.COS_BUCKET,
      cosBucketInvalidate: process.env.INVALIDATE_COS_BUCKET,
      region: process.env.REGION,
    }})
  });

  app.use('/api/DescribeInstances', async (req, res) => {
    try {
      const credential = await getCredential();
      console.log('credential', credential);

      const {
        TmpSecretId: secretId,
        TmpSecretKey: secretKey,
        Token: token,
      } = credential;

      const cvm = new tencentcloud.cvm.v20170312.Client({
        credential: { secretId, secretKey, token },
        region: 'ap-guangzhou',
        profile: {
          httpProfile: {
            endpoint: 'cvm.internal.tencentcloudapi.com',
            protocol: 'https://',
          },
        },
      });

      const instances = await cvm.DescribeInstances();
      res.send({ Response: instances });
    } catch (err) {
      const { message: Message } = err || { message: '发生未知错误' };
      res.status(500).send({ Error: { Message } });
    }
  });

  app.use('/api/GetLoadBalanceOverview', async (req, res) => {
    try {
      const credential = await getCredential();
      console.log('credential', credential);

      const {
        TmpSecretId: secretId,
        TmpSecretKey: secretKey,
        Token: token,
      } = credential;

      const clb = new tencentcloud.clb.v20180317.Client({
        credential: { secretId, secretKey, token },
        region: 'ap-guangzhou',
        profile: {
          httpProfile: {
            endpoint: 'clb.internal.tencentcloudapi.com',
            protocol: 'https://',
          },
        },
      });

      const balance = await clb.DescribeLoadBalancerOverview();

      res.send({ Response: balance });
    } catch (err) {
      const { message: Message } = err || { message: '发生未知错误' };
      res.status(500).send({ Error: { Message } });
    }
  });

  const port = process.env.SERVER_PORT || 8000;
  app.listen(port);
  console.log(`Server listening at ${port}`);
}

main();
