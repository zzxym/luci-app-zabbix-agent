'use strict';

'require uci';
'require fs';
'require ui';
'require view';
'require i18n';

var _ = i18n.bind('zabbix-agentd');

return view.extend({
	load: function() {
		return Promise.all([
			uci.load('zabbix-agentd')
		]);
	},

	render: function() {
		var m, s, o;

		m = new ui.Form('zabbix-agentd', {
			target: ui.url('admin/services/zabbix-agentd/general'),
			onsave: function() { ui.showNotification(_('Save successful'), 'success'); },
			onerror: function() { ui.showNotification(_('Save failed'), 'error'); }
		});

		s = m.section(ui.SimpleSection, null, _('Basic Settings'));

		o = s.option(ui.Flag, 'enabled', _('Enable Zabbix Agentd'));
		o.default = o.disabled = false;

		o = s.option(ui.Value, 'server', _('Zabbix Server Address'));
		o.datatype = 'host';
		o.default = '127.0.0.1';

		o = s.option(ui.Value, 'server_port', _('Zabbix Server Port'));
		o.datatype = 'port';
		o.default = '10051';

		o = s.option(ui.Value, 'hostname', _('Hostname'));
		o.default = '';

		o = s.option(ui.Value, 'listen_ip', _('Listen Address'));
		o.datatype = 'ipaddr';
		o.default = '0.0.0.0';

		o = s.option(ui.Value, 'listen_port', _('Listen Port'));
		o.datatype = 'port';
		o.default = '10050';

		s = m.section(ui.SimpleSection, null, _('Advanced Settings'));

		o = s.option(ui.ListValue, 'log_level', _('Log Level'));
		o.value('0', _('Low'));
		o.value('1', _('Medium'));
		o.value('2', _('High'));
		o.value('3', _('Debug'));
		o.default = '3';

		o = s.option(ui.Value, 'timeout', _('Timeout'));
		o.datatype = 'uinteger';
		o.default = '3';

		o = s.option(ui.Value, 'buffer_size', _('Buffer Size'));
		o.datatype = 'uinteger';
		o.default = '100';

		o = s.option(ui.Value, 'heartbeat', _('Heartbeat Interval'));
		o.datatype = 'uinteger';
		o.default = '30';

		o = s.option(ui.Flag, 'enable_remote_commands', _('Enable Remote Commands'));
		o.default = o.disabled = false;

		s = m.section(ui.RepeatedSection, 'userparameter', _('User Defined Parameters'));
		s.addremove = true;

		o = s.option(ui.Value, 'name', _('Parameter Name'));
		o.rmempty = false;

		o = s.option(ui.Value, 'command', _('Parameter Command'));
		o.rmempty = false;

		return m.render();
	},

	commit: function() {
		return uci.save();
	}
});