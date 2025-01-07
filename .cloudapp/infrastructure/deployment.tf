resource "random_password" "password_for_cvm" {
  length           = 16
  override_special = "_+-&=!@#%^()"
}

# 应用服务
resource "tencentcloud_instance" "cvm_for_app" {
  availability_zone                   = var.app_main_subnet.availability_zone
  instance_charge_type                = "POSTPAID_BY_HOUR"
  image_id                            = var.app_image.image_id
  instance_type                       = var.cvm_instance_quality.instance_type
  system_disk_size                    = 50
  internet_max_bandwidth_out          = 10
  vpc_id                              = var.app_main_subnet.vpc_id
  subnet_id                           = var.app_main_subnet.subnet_id
  security_groups                     = [var.app_clb_sg.security_group_id]
  password                            = random_password.password_for_cvm.result
  cam_role_name                       = var.cloudapp_cam_role
  data_disks {
    data_disk_type = "CLOUD_PREMIUM"
    data_disk_size = 200
  }

  user_data_raw = <<-EOT
  #!/bin/bash

  mkdir -p /root/init
  cd /root/init

  repo_name='${var.cloudapp_repo_username}'

  echo "export CAM_ROLE='${var.cloudapp_cam_role}'" > variables
  echo "export DOCKER_USERNAME='$repo_name'" >> variables
  echo "export DOCKER_PASSWORD='${var.cloudapp_repo_password}'" >> variables

  echo "export COS_BUCKET='${var.app_cos.bucket}'" >> variables
  echo "export INVALIDATE_COS_BUCKET='${var.app_cos_invalidate.bucket}'" >> variables

  echo "export REGION='${var.app_main_subnet.region}'" >> variables

  sh -x ./init.sh > init.log 2>&1

  EOT
}