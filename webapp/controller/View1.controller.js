sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.kt.layout.layoutexamp.controller.View1", {
            onInit: function () {
                var sdate = new Date("12-04-2024");
                var jsonData1 = [{
                    "expenseId": 1,
                    "expenseName": "Car",
                    "expenseAmount": 1000,
                    "expenseDate": sdate
                }, {
                    "expenseId": 2,
                    "expenseName": "Train",
                    "expenseAmount": 2000,
                    "expenseDate": sdate
                }]

                var oModel = new sap.ui.model.json.JSONModel(jsonData1);
                this.getView().setModel(oModel, "dataBind");

            },
            onPressImg: function () {
                window.open("https://www.linkedin.com/feed/", "_blank")
            },
            
            onChangeSwitch:function(){

                var k=sap.ui.getCore().byId("switchId").getState(); 

                
              if(k===true){
                sap.ui.getCore().byId("exName1").setVisible(false);
                 sap.ui.getCore().byId("exAmount").setVisible(false);
                 sap.ui.getCore().byId("expenseTypeId").setVisible(true);
                 sap.ui.getCore().byId("expenseDayId").setVisible(true);
                 
               }
              else if(k===false){
                sap.ui.getCore().byId("expenseTypeId").setVisible(false);
                // var sExDate = sap.ui.getCore().byId("DP3").getValue();
                sap.ui.getCore().byId("expenseDayId").setVisible(false);
                sap.ui.getCore().byId("exName1").setVisible(true);
                sap.ui.getCore().byId("exAmount").setVisible(true);
                }
            },
            onPressEvent: function () {
                var oView = this.getView();
                if (!this.oDialog) {
                    this.oDialog = sap.ui.core.Fragment.load({
                        name: "com.sap.kt.layout.layoutexamp.fragment.expen",
                        controller: this
                    }).then(function (oDialog) {
                        this.oDialog = oDialog;
                        oView.addDependent(this.oDialog);
                        this.onValidation();
                        this.oDialog.open();
                    }.bind(this));
                } else {
                    this.onValidation();
                    this.oDialog.open();
                    sap.ui.getCore().byId("expenseTypeId").setSelectedKey('None');
                    sap.ui.getCore().byId("expenseDayId").setValue('');
                    sap.ui.getCore().byId("DP3").setValue('');
                    sap.ui.getCore().byId("exAmount").setValue('');
                    sap.ui.getCore().byId("exName1").setValue('');
                }

            },
            onPressSave: function () {
                var k1=sap.ui.getCore().byId("switchId").getState();
                if(k1==true){
                var sExpType = sap.ui.getCore().byId("expenseTypeId").getSelectedKey();
                var sDate = sap.ui.getCore().byId("DP3").getValue();
                var sDays = sap.ui.getCore().byId("expenseDayId").getValue();
                var oModel = this.getView().getModel("dataBind").getData();
                var s = new Date(sDate);
                // var k=new Date();
                // var m=new Date(k);
                // m.setDate(m.getDate()-60);
              //  this.onHandleChange();
                //console.log(m);
                if(!sDate){
                    sap.ui.getCore().byId("DP3").setValueState("Error");
                    sap.m.MessageToast.show("Date should not be future and within the 2months range")
                }else{
                 sap.ui.getCore().byId("DP3").setValueState("None");
                 if (sDays <= 30 && sDays!=="") {
                    for (let i = 0; i <= sDays - 1; i++) {
                        if (sExpType == "Perdiem") {
                            if (i == 0) {
                                var oPayload = {
                                    "expenseId": oModel.length + 1,
                                    "expenseName": sExpType,
                                    "expenseAmount": 1000,
                                    "expenseDate": new Date(s.setDate(s.getDate()))
                                }
                            }
                            else {
                                var oPayload = {
                                    "expenseId": oModel.length + 1,
                                    "expenseName": sExpType,
                                    "expenseAmount": 1000,
                                    "expenseDate": new Date(s.setDate(s.getDate() + 1))
                                }
                            }
                            oModel.push(oPayload);
                            this.oDialog.close();
                            this.byId("idProductsTable").getModel("dataBind").refresh();
                        } else if (sExpType == "Taxi") {
                            if (i == 0) {
                                var oPayload = {
                                    "expenseId": oModel.length + 1,
                                    "expenseName": sExpType,
                                    "expenseAmount": " ",
                                    "expenseDate": new Date(s.setDate(s.getDate()))
                                }
                            }
                            else {
                                var oPayload = {
                                    "expenseId": oModel.length + 1,
                                    "expenseName": sExpType,
                                    "expenseAmount": " ",
                                    "expenseDate": new Date(s.setDate(s.getDate() + 1))
                                }
                            }
                            oModel.push(oPayload);
                            this.oDialog.close();
                            this.byId("idProductsTable").getModel("dataBind").refresh();
                        }   
                        // MessageBox.success("Expense Saved Successfully")
                        else{
                            sap.ui.getCore().byId("expenseTypeId").setValueState("None");
                            sap.m.MessageToast.show("Enter the Type")
                        }
                    }
                } else {
                    sap.ui.getCore().byId("expenseDayId").setValueState("Error");
                    sap.m.MessageToast.show("Invalid input days not Morethan 30")
                }
                }
              
            }else{
                var sExpType1 = sap.ui.getCore().byId("exName1").getValue();
                var sDate1 = sap.ui.getCore().byId("DP3").getValue();
                var sAmount = sap.ui.getCore().byId("exAmount").getValue();
                var oModel1 = this.getView().getModel("dataBind").getData();
            if(!sExpType1 || !sDate1 || !sAmount){
                if(!sDate1){
                    sap.ui.getCore().byId("DP3").setValueState("Error");
                    sap.ui.getCore().byId("DP3").setValueStateText("Enter Value type");
                   }   
               if(!sExpType1){
                sap.ui.getCore().byId("exName1").setValueState("Error");
                sap.ui.getCore().byId("exName1").setValueStateText("Enter Value type");
               }
               else{
                sap.ui.getCore().byId("exName1").setValueState("None");
               }
               if(!sAmount){
                sap.ui.getCore().byId("exAmount").setValueState("Error");
                sap.ui.getCore().byId("exAmount").setValueStateText("Enter Value amount");
               }
               else{
                sap.ui.getCore().byId("exAmount").setValueState("None");
               }
            }else{  
                  sap.ui.getCore().byId("DP3").setValueState("None");
                var oPayload = {
                    "expenseId":oModel1.length+1,
                    "expenseName":sExpType1,
                    "expenseAmount":sAmount,
                    "expenseDate":new Date(sDate1)
                }
                oModel1.push(oPayload);
                this.oDialog.close();
                this.byId("idProductsTable").getModel("dataBind").refresh();
              }
            
            }
            },
            onPressClose: function () {
                this.oDialog.close();
            },
            onDeleteRow: function (oEvent) {
                var sSelectedPath = oEvent.getParameter("listItem").getBindingContextPath().split("/")[1];
                this.getView().getModel("dataBind").getData().splice(sSelectedPath, "1");
                this.byId("idProductsTable").getModel("dataBind").refresh();

            },
            onLiveChangeValue:function(oEvent) {
                if(oEvent.getSource().getValue()) {
                oEvent.getSource().setValueState("None");
                } else {
                oEvent.getSource().setValueState("Error");
                oEvent.getSource().setValueStateText("Enter the value");
                }
                },
            onValidation:function(){
                var k=new Date();
                var m=new Date(k);
                m.setDate(m.getDate()-60);
                sap.ui.getCore().byId("DP3").setMinDate(k);
                sap.ui.getCore().byId("DP3").setMaxDate(m);
            }           
        });
    });
