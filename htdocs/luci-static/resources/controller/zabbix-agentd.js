'use strict';
'require admin';
'require fs';

return L.resolveDefault().then(function() {
	return {  
		module_title: _('Zabbix Agentd'),
		index: function() {
			return this.redirect('admin/services/zabbix-agentd/general');
		},
		
		view: function() {
			return L.view('zabbix-agentd/general');
		}
	};
});