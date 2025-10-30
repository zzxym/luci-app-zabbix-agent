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

# 其他元数据
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=zzxym <zzxym2001@163.com>

# 确保download目标可用（必须放在include luci.mk之前）
define Build/Download
	echo "No download needed for luci-app-zabbix-agent - this is a UI package"
	touch $(PKG_BUILD_DIR)/.download_complete
endef

# LuCI包配置
LUCI_TITLE:=LuCI for Zabbix Agentd
LUCI_DESCRIPTION:=Provides a web interface for Zabbix Agentd configuration and management
LUCI_DEPENDS:=+luci-base +zabbix-agentd
LUCI_PKGARCH:=all

# 包含LuCI构建规则
include $(TOPDIR)/feeds/luci/luci.mk

# 确保包文件存在
define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	touch $(PKG_BUILD_DIR)/.prepared
endef

# call BuildPackage - OpenWrt buildroot signature