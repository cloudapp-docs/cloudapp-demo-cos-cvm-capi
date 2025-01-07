# 云应用示例 - 自定义应用权限策略

本示例演示了通过 `role.policy` 声明权限策略，并验证权限策略的效果。同时说明了在应用中 [调用云 API](https://cloud.tencent.com/document/product/1689/109427) 的方法。

## 目录说明
- [.cloudapp](.cloudapp) 云应用应用包根目录
  - [infrastructure](.cloudapp/infrastructure) 资源及变量定义目录
    - [variable.tf](.cloudapp/infrastructure/variable.tf) 变量定义
    - [deployment.tf](.cloudapp/infrastructure/deployment.tf) 资源定义
    - [provider.tf](.cloudapp/infrastructure/provider.tf) 全局公共参数（固定不变）
  - [package.yaml](.cloudapp/package.yaml)  云应用配置文件
- [server](./server) 服务端代码，用于当前示例演示
- [frontend](./frontend) 前端代码，用于当前示例演示
- [sh](./sh) CVM 注入的 shell 脚本源码，镜像中已存在
  - [init.sh](./sh/init.sh) 应用初始化脚本，对应镜像中的 `/root/init/init.sh`
  - [install.sh](./sh/install.sh) 安装 docker 环境

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
