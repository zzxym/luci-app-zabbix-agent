#
# Copyright (C) 2024 zabbix-agent
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

# 基本包配置
PKG_NAME:=luci-app-zabbix-agent
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

# LuCI特定配置
LUCI_TITLE:=LuCI for Zabbix Agentd
LUCI_PKGARCH:=all
LUCI_DEPENDS:=+luci-base +zabbix-agentd

# 包元数据
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=zzxym <zzxym2001@163.com>

# 直接包含LuCI构建规则（这会处理所有标准目标，包括download）
include $(TOPDIR)/feeds/luci/luci.mk

# 这个包是一个纯UI包，不需要额外的下载或编译步骤
# luci.mk已经提供了所有必要的目标定义


# call BuildPackage - OpenWrt buildroot signature