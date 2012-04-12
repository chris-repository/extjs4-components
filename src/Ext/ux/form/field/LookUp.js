/**
 * @class Ext.ux.fom.field.LookUp
 * @extends Ext.form.field.Trigger
 * LookUp field with a trigger button that opens up a grid container with data
 * to be filled with.
 *
 * For example:
 *
 *		 @example
 *		 Ext.create('Ext.ux.form.field.LookUp', {
 *			 name: // the field name
 *			gridPanel: // the grid panel that will fit inside the window,
 *			 valueField: // the column name of the grid to be used as value to submit,
 *			 displayField: // the column name of the grid to be displayed in the field box
 *		 });
 *
 * @author Daniel Ribeiro Gomes Pereira <drgomesp@gmail.com>
 */
Ext.define('Ext.ux.form.field.LookUp', {
	extend: 'Ext.form.field.Trigger',
	alternateClassName: 'Ext.form.LookUp',
	alias: ['widget.lookupfield', 'widget.lookup'],
	xtype: 'lookupfield',

	/**
	 * @cfg {string} windowTitle
	 * The window title.
	 */
	windowTitle: null,

	/**
	 * @cfg {int} windowHeight
	 * The window height.
	 */
	windowHeight: null,

	/**
	 * @cfg {int} windowWidth
	 * The window width.
	 */
	windowWidth: null,

	/**
	 * @cfg {Ext.grid.Panel} gridPanel
	 * The grid panel related to the LookUp field.
	 * @required
	 */
	gridPanel: null,

	/**
	 * @cfg {string} displayField
	 * The field to be displayed.
	 * @required
	 */
	displayField: null,

	/**
	 * @cfg {string} valueField
	 * The field to serve as value.
	 * @required
	 */
	valueField: null,

	/**
	 * Initializes the component.
	 * @overrides Ext.form.field.Trigger.initComponent()
	 */
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			/**
			 * @cfg {Ext.Function.bind()} onTriggerClick
			 * Binds the openWindow function to the onTriggetClick function.
			 */
			onTriggerClick: Ext.Function.bind(me.openWindow, me),
			/**
			 * @cfg {string} triggerCls
			 * Alternates the stylesheet class of the trigger button.
			 */
			triggerCls: 'x-form-search-trigger',
			/**
			 * @cfg {boolean} editable
			 * Prevents this component from being edit.
			 */
			editable: false,
			/**
			 * @cfg {Ext.window.Window} window
			 * The window that will opened on the trigger click event.
			 */
			window: null
		});

		me.callParent();

		me.initWindow();
	},

	/**
	 * Initializes the events.
	 * @overrides Ext.form.field.Text.initEvents()
	 */
	initEvents: function() {
		var me = this;

		me.gridPanel.on('select',
			Ext.Function.bind(me.saveSelectedRecord, me));

		me.callParent();
	},

	/**
	 * Initializes the window.
	 */
	initWindow: function() {
		var me = this;

		me.window = Ext.create('Ext.window.Window', {
			title: me.windowTitle,
			width: me.windowWidth,
			height: me.windowHeight,
			/**
			 * @cfg {string} layout
			 * Ensures that the content will fit the window.
			 */
			layout: 'fit',
			/**
			 * @cfg {string} closeAction
			 * Ensures that the window won't be destroyed when closed.
			 */
			closeAction: 'hide',
			/**
			 * @cfg {Ext.grid.Panel} items
			 * Adds the grid panel to the window.
			 */
			items: me.gridPanel
		});
	},

	/**
	 * Opens the window if this component is enabled.
	 */
	openWindow: function() {
		var me = this;

		if(me.disabled) {
			return false;
		}

		me.window.show();
	},

	/**
	 * Saves the given record to the component.
	 * @param record {Ext.selection.RowModel} The selected record from the grid panel
	 */
	saveSelectedRecord: function(record) {
		var me = this;

		var selected = record.getLastSelected();

		me.valueField = selected.get(me.valueField);
		me.setValue(selected.get(me.displayField));

		me.window.hide();
	},

	/**
	 * Returns the value to be submitted by the form.
	 * @overrides Ext.form.field.Base.getSubmitValue()
	 */
	getSubmitValue: function() {
		var me = this;
		return me.valueField;
	}
});