#
# Copyright (C) 2024 zabbix-agent
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI for Zabbix Agentd
LUCI_DESCRIPTION:=Provides a web interface for Zabbix Agentd configuration and management

LUCI_DEPENDS:=+luci-base +zabbix-agentd
LUCI_PKGARCH:=all
PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=作者 <author@example.com>

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature