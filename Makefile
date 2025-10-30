#
# Copyright (C) 2024 zabbix-agent
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

# 包名和版本信息
PKG_NAME:=luci-app-zabbix-agent
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

# LuCI包配置
LUCI_TITLE:=LuCI for Zabbix Agentd
LUCI_DESCRIPTION:=Provides a web interface for Zabbix Agentd configuration and management
LUCI_DEPENDS:=+luci-base +zabbix-agentd
LUCI_PKGARCH:=all

# 其他元数据
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=作者 <author@example.com>

# 包含LuCI构建规则
include $(TOPDIR)/feeds/luci/luci.mk

# 确保download目标可用
define Build/Download
	# 这个包是纯LuCI界面，不需要下载外部源码
endef

# call BuildPackage - OpenWrt buildroot signature