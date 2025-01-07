# 云应用实例项目 - 上传文件到 COS & 调用云 API

本示例演示了通过 `role.policy` 声明权限策略，并验证权限策略的效果。同时说明了在应用中 [调用云 API](https://cloud.tencent.com/document/product/1689/109427) 的方法。

## 准备工作

将代码中的 `${packageId}` 替换为实际的云应用包 ID

## 开发

1、构建前端产物

```
cd ./frontend
npm i
npm run build
```

2、构建 server 容器镜像

```
cd ./server
npm i
npm run build
npm run push
```

3、推送镜像到仓库

```
docker login xxx # 可以在云应用控制台 - 应用包管理中查看
npm run push
```
