#!/bin/bash

# 读取环境变量
sudo source ./variables

# 登录 Docker 仓库
echo "登录..."
sudo docker login cloudapp.tencentcloudcr.com --username "${DOCKER_USERNAME}" --password ${DOCKER_PASSWORD}

# 拉取指定的Docker镜像
echo "拉取镜像 ..."
sudo docker pull "cloudapp.tencentcloudcr.com/${packageId}/cloudapp-demo-cos-cvm-capi:2025-01-06_165818"

# 运行容器
echo "运行容器 ..."
sudo docker run -e CAM_ROLE="${CAM_ROLE}" -e COS_BUCKET="${COS_BUCKET}" -e INVALIDATE_COS_BUCKET="${INVALIDATE_COS_BUCKET}" -e REGION="${REGION}" -p 80:8000 "cloudapp.tencentcloudcr.com/${packageId}/cloudapp-demo-cos-cvm-capi:2025-01-06_165818"
