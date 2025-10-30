# luci-app-zabbix-agent

这是一个为OpenWrt上的Zabbix Agentd服务提供Web界面管理的LuCI应用。

## 功能特性

- 启用/禁用Zabbix Agentd服务
- 配置Zabbix Server地址和端口
- 设置主机名、监听地址和端口
- 配置日志级别和超时时间
- 添加自定义监控参数
- 提供服务控制功能

## 安装方法

### 从源码编译

1. 将此仓库克隆到你的OpenWrt源码目录中：

```bash
git clone https://github.com/zzxym/luci-app-zabbix-agent.git package/luci-app-zabbix-agent
```

2. 编译OpenWrt固件或单独打包：

```bash
# 编译固件
make menuconfig
# 选中 luci-app-zabbix-agent
make -j$(nproc)

# 或单独打包
make package/luci-app-zabbix-agent/compile V=99
```

## 依赖

- luci-base
- zabbix-agentd

## 使用说明

1. 安装后，在LuCI界面的`服务`菜单下找到`Zabbix Agentd`
2. 配置基本设置，包括服务器地址、主机名等
3. 可以添加自定义监控参数
4. 保存配置后重启服务使设置生效

## 配置文件

- UCI配置文件: `/etc/config/zabbix-agentd`
- 生成的Zabbix Agentd配置: `/etc/zabbix/zabbix_agentd.conf`

## 许可证

Apache License 2.0