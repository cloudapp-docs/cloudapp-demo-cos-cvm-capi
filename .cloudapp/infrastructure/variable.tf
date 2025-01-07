# 系统变量
variable "cloudapp_repo_server" {}
variable "cloudapp_repo_username" {}
variable "cloudapp_repo_password" {}

# 用于调用应用接口的 CAM 角色名，需传给 CVM 或者 TKE 使用
variable "cloudapp_cam_role" {}
# 云应用实例 ID
variable "cloudapp_id" {}
# 云应用实例名称
variable "cloudapp_name" {}
# 云应用实例标签清单
variable "cloudapp_tags" {}
# 安装用户 uin
variable "cloudapp_installer_uin" {}
# 所属主账号 uin
variable "cloudapp_owner_uin" {}
# 所属主账号 appid
variable "cloudapp_owner_appid" {}
# 规格
variable "cloudapp_spec" {}


# 用户选择的安装目标位置，VPC 和子网，在 package.yaml 中定义了输入组件
variable "app_main_subnet" {
  type = object({
    region    = string
    region_id = string
    vpc = object({
      id         = string
      cidr_block = string
    })
    subnet = object({
      id   = string
      zone = string
    })
  })
}

variable "app_clb_sg" {
  type = object({
    region            = string
    security_group_id = string
  })
}

variable "cvm_instance_quality" {
  type = object({
    instance_type = string
  })
}


# 镜像选择
variable "app_image" {
  type = object({
    image_id = string
  })

  default = {
    image_id = "img-k9nzdh56"
  }
}

# cos
variable "app_cos" {
  type = object({
    region    = string
    region_id = string
    bucket    = string
    app_id    = string
  })
}

variable "app_cos_invalidate" {
  type = object({
    region    = string
    region_id = string
    bucket    = string
    app_id    = string
  })
}

output "main" {
  description = "入口地址"
  value = "http://${tencentcloud_instance.cvm_for_app.public_ip}/public/index.html"
}