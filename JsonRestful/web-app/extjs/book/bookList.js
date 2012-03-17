Ext.Loader.setConfig({
	enabled : true
});
Ext.Loader.setPath('Ext.ux', '../extjs/examples/ux');

Ext.require([ 'Ext.grid.*', 'Ext.data.*','Ext.ux.form.SearchField']);

Ext
		.onReady(function() {

			Ext.tip.QuickTipManager.init();

			Ext.define('Book', {
				extend : 'Ext.data.Model',
				fields : [ {
					name : 'id',
					type : 'int',
					useNull : true
				}, 'author', 'price', 'title' ],
				validations : [ {
					type : 'length',
					field : 'author',
					min : 1
				}, {
					type : 'length',
					field : 'title',
					min : 1
				} ]
			});

			var store = Ext
					.create(
							'Ext.data.Store',
							{
								// autoSync: true,
								autoLoad : true,
								model : 'Book',
								proxy : {
									type : 'rest',
									url : '/JsonRestful/api/book',
									reader : {
										root : 'data',
										type : 'json'
									},
									writer : {
										type : 'json'
									},

									listeners : {
										exception : function(proxy, response,
												operation) {
											// console.log(operation);
											console.log(response);

										}
									}
								},
								listeners : {
									write : function(store, operation) {
										console.log(operation);
										var record = operation.getRecords()[0], name = Ext.String
												.capitalize(operation.action), verb;

										if (name == 'Destroy') {
											record = operation.records[0];
											verb = 'Destroyed';
										} else {
											verb = name + 'd';
										}
										Ext.example.msg(name, Ext.String
												.format("{0} book: {1}", verb,
														record.getId()));

									}
								}
							});

			var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
				clicksToMoveEditor : 1,
				autoCancel : false
			});

			var selModel = Ext.create('Ext.selection.CheckboxModel');

			var grid = Ext
					.create(
							'Ext.grid.Panel',
							{
								height : 400,
								width : 720,
								x : 150,
								y : 7.5,
								title : '著作',
								store : store,
								frame : true,
								renderTo : 'books',
								selModel : selModel,
								columnLines : true,
								disableSelection : false,
								columns : [ {
									text : "id",
									withd : 40,
									dataIndex : 'id',
									sortable : true
								}, {
									header : "Title",
									flex : 25,
									dataIndex : 'title',
									sortable : false,
									editor : {
										allowBlank : false
									}
								}, {
									xtype : 'numbercolumn',
									header : "Price",
									flex : 25,
									dataIndex : 'price',
									sortable : true,
									editor : {
										xtype : 'numberfield',
										allowBlank : false,
										minValue : 1,
										maxValue : 150000
									}
								}, {
									header : "Author",
									flex : 25,
									dataIndex : 'author',
									sortable : true,
									editor : {
										allowBlank : false
									}
								} ],

								listeners : {
									'selectionchange' : function(sm, selections) {
										grid.down('#delete').setDisabled(
												selections.length == 0);
									}
								},

								dockedItems : [
										{
											dock : 'top',
											xtype : 'toolbar',
											items : [
													{
														xtype : 'button',
														text : '添加数据',
														tooltip : "添加新数据",
														icon : '../extjs/examples/shared/icons/fam/add.png',
														handler : function() {
															// empty record
															store.insert(0,
																	new Book());
															rowEditing
																	.startEdit(
																			0,
																			0);
														}
													},
													'-',
													{
														itemId : 'delete',
														disabled : true,
														text : '删除',
														tooltip : '删除选中数据',
														icon : '../extjs/examples/shared/icons/fam/delete.gif',
														handler : function() {
															var records = grid
																	.getView()
																	.getSelectionModel()
																	.getSelection();
															for ( var i = 0; i < records.length; i++) {
																if (records[i]) {
																	store
																			.remove(records[i]);
																}
															}
															;
														}
													},
													'-',
													{
														xtype : 'button',
														text : '提交数据',
														tooltip : "提交新增数据",
														icon : '../extjs/examples/shared/icons/fam/accept.png',
														handler : function() {
															store.sync();
														}
													},
													'-',
													{
														itemId : 'Button',
														text : '选中行ID',
														tooltip : 'Show Choose Id',
														icon : '../extjs/examples/shared/icons/fam/information.png',
														handler : function() {
															var record = grid
																	.getSelectionModel()
																	.getSelection();
															if (record.length == 0) {
																Ext.MessageBox
																		.show({
																			title : "信息:",
																			msg : "未选中任何数据"
																		})
																return;
															} else {
																var ids = "";
																for ( var i = 0; i < record.length; i++) {
																	ids += record[i]
																			.get("id")
																	if (i < record.length - 1) {
																		ids = ids
																				+ ",";
																	}
																}
																Ext.MessageBox
																		.show({
																			title : "所有选中行ID",
																			msg : ids
																		})
															}
														}
													}, '-', {
														width : 200,
														fieldLabel : '查询',
														labelWidth : 80,
														xtype : 'searchfield',
														store : store
													} ]
										},
										{
											dock : 'bottom',
											xtype : 'pagingtoolbar',
											store : store,
											pageSize : 25,
											displayInfo : true,
											displayMsg : '开始 {0} - {1}结束,共计{2}条',
											emptyMsg : '没有数据！'
										} ],
								plugins : [ rowEditing ]
							})

		});
