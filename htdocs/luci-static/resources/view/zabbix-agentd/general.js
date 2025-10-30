'use strict';
'require view';
'require form';
'require uci';
'require fs';
'require ui';

return view.extend({
	render: function() {
		return E('div', { 'class': 'cbi-map' }, [
			E('h2', _('Zabbix Agentd 配置')),
			E('div', { 'class': 'cbi-map-descr' }, _('配置 Zabbix Agentd 监控代理的基本设置')),
			this.form.render()
		]);
	},

	load: function() {
		return Promise.all([
			uci.load('zabbix-agentd'),
			this.get_status()
		]);
	},

	get_status: function() {
		return fs.exec_direct('/etc/init.d/zabbix-agentd status').then(function(res) {
			return res.indexOf('running') !== -1;
		}).catch(function() {
			return false;
		});
	},

	init: function() {
		this.form = new form.Form('/admin/services/zabbix-agentd', 'zabbix-agentd');

		// 基本设置部分
		var s = this.form.section(form.TypedSection, 'general', _('基本设置'));
		s.anonymous = true;
		s.addremove = false;

		// 启用/禁用开关
		s.option(form.Flag, 'enable', _('启用 Zabbix Agentd'));

		// 服务器地址
		s.option(form.Value, 'server', _('Zabbix Server 地址'), _('允许连接的 Zabbix Server IP 地址，多个地址用逗号分隔'));

		// 主动模式服务器
		s.option(form.Value, 'server_active', _('主动模式服务器'), _('主动连接的 Zabbix Server IP:端口'));

		// 主机名
		s.option(form.Value, 'hostname', _('主机名'), _('服务器上配置的主机名，留空使用系统主机名'));

		// 监听地址
		s.option(form.Value, 'listen_ip', _('监听地址'), _('Agent 监听的 IP 地址'));

		// 监听端口
		s.option(form.Value, 'listen_port', _('监听端口'), _('Agent 监听的端口号')).datatype = 'port';

		// 远程命令
		s.option(form.Flag, 'enable_remote_commands', _('允许远程命令'), _('是否允许服务器执行远程命令'));

		// 日志级别
		var log_level = s.option(form.ListValue, 'log_level', _('日志级别'));
		log_level.value('0', _('调试 (Debug)'));
		log_level.value('1', _('信息 (Info)'));
		log_level.value('2', _('警告 (Warning)'));
		log_level.value('3', _('错误 (Error)'));
		log_level.value('4', _('严重 (Critical)'));
		log_level.value('5', _('警报 (Alert)'));
		log_level.value('6', _('灾难 (Disaster)'));

		// 超时设置
		s.option(form.Value, 'timeout', _('超时时间 (秒)'), _('处理请求的超时时间')).datatype = 'uinteger';

		// 包含目录
		s.option(form.Value, 'include_dir', _('包含配置目录'), _('包含其他配置文件的目录'));

		// 高级设置部分
		var advanced = this.form.section(form.TypedSection, 'userparameter', _('用户自定义参数'), _('添加自定义监控项'));
		advanced.anonymous = true;
		advanced.addremove = true;

		advanced.option(form.Value, 'name', _('参数名称'), _('参数键名，格式为 <参数名>'));
		advanced.option(form.TextValue, 'command', _('命令'), _('执行的命令或脚本'));

		// 服务控制按钮
		this.form.handle(function(section, option, value) {
			return false;
		});
	},

	handleSaveApply: function(ev) {
		return this.form.save().then(function() {
			return ui.showModal(_('提示'), E('p', _('配置已保存，请重启服务使配置生效')), [
				E('button', {
					'class': 'btn cbi-button cbi-button-positive',
					'click': function() {
						fs.exec_direct('/etc/init.d/zabbix-agentd restart');
						ui.hideModal();
						setTimeout(function() {
							location.reload();
						}, 1000);
					}
				}, _('立即重启')),
				E('button', {
					'class': 'btn cbi-button cbi-button-negative',
					'click': function() {
						ui.hideModal();
					}
				}, _('稍后重启'))
			]);
		});
	}
});