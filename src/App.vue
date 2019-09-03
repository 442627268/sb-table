<template>
    <div id="app">
        <el-table
                ref="table"
                :data="tableData"
                style="width: 1200px">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="drugCode"
                    label="药品编码"
                    width="100"
            ></el-table-column>
            <el-table-column
                    prop="drugName"
                    label="药品名称"
                    width="180">
                <template slot-scope="scope">
                    <column-table :isColumn="isColumn" :key="scope.$index"
                                  @rowEnter="(row,cellback)=>rowEnter(row,scope.$index,cellback)"
                                  @infinitescroll="infinitescroll" :column="column" :columnData="columnData"
                                  v-model="scope.row.drugName" :canEditCell="canEditCell"></column-table>
                </template>
            </el-table-column>
            <el-table-column
                    prop="drugSpec"
                    show-overflow-tooltip
                    width="180"
                    label="药品规格">
                <template slot-scope="scope">
                    <column-input :key="scope.$index" @editCell="(val)=>editCell(val,scope.$index)"
                                  v-model="scope.row.drugSpec" :canEditCell="false"></column-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="drugSpec"
                    show-overflow-tooltip
                    width="180"
                    label="列编辑">
                <template slot-scope="scope">
                    <!--isColumn 开启列编辑 :isColumn="7"-->
                    <column-input :key="scope.$index" :isColumn="isColumn" v-model="scope.row.drugCountryName"
                                  :canEditCell="canEditCell"></column-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="prodDate"
                    label="有效期至"
                    show-overflow-tooltip
                    width="260">
                <template slot-scope="scope">
                    <column-date :key="scope.$index" v-model="scope.row.perival" :canEditCell="true"></column-date>
                </template>
            </el-table-column>
            <el-table-column
                    prop=""
                    label="外观质量"
                    show-overflow-tooltip
                    width="180">
                <template slot-scope="scope">
                    <column-select :key="scope.$index" :defaultItem="{value:'code',label:'tname'}" :selectData="options"
                                   :defaultStr="scope.row.appearanceStr"
                                   v-model="scope.row.appearance" :canEditCell="canEditCell"></column-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    show-overflow-tooltip
                    label="备注">
                <template slot-scope="scope">
                    <column-input :key="scope.$index" @addRow="addRow" v-model="scope.row.remark"
                                  :canEditCell="canEditCell"></column-input>
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="isColumn=7">开启列编辑</el-button>
        <el-button @click="addTableData">添加行</el-button>
        <el-button @click="edit">开启编辑</el-button>
        <el-button @click="cancelEdit">取消编辑</el-button>
    </div>
</template>

<script>
  import columnInput from './components/column-input'
  import columnDate from './components/column-date'
  import columnSelect from './components/select/column-select'
  import columnTable from './components/table/column-table'

  export default {
    name: 'app',
    data() {
      return {
        isColumn: 0,
        tableData: [
          {
            "drugCode": 1275,
            "drugManufactCode": 1600662,
            "drugFormName": "胶囊剂",
            "isBasicDrug": "0",
            "purchasePrice": 146.48,
            "disRetailPrice": 20.9257,
            "dsUnitName": "盒",
            "drugSpec": "30mg*7粒/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100030,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 20.9257,
            "approvalDocumentNo": "国药准字H20123287",
            "drugManufactName": "四川绿叶制药股份有限公司",
            "drugFormCode": 10028,
            "drugBusiCode": "007Z98845",
            "drugName": "乌苯美司胶囊-TEST",
            "drugTypeName": "普通",
            "perival": "2015-08-14",
            "drugCountryName": "川内",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 1,
            "retailPrice": 146.48
          },
          {
            "drugCode": 1302,
            "drugManufactCode": 1600220,
            "drugFormName": "片剂",
            "isBasicDrug": "1",
            "purchasePrice": 24.69,
            "disRetailPrice": 2.469,
            "dsUnitName": "盒",
            "drugSpec": "0.2g*10片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 2.469,
            "approvalDocumentNo": "国药准字H19993254",
            "drugManufactName": "赛诺菲(杭州)制药有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007P001919",
            "drugName": "盐酸胺碘酮片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 2,
            "retailPrice": 24.69
          },
          {
            "drugCode": 1303,
            "drugManufactCode": 1100128,
            "drugFormName": "注射液",
            "isBasicDrug": "0",
            "purchasePrice": 25.52,
            "disRetailPrice": 25.52,
            "dsUnitName": "支",
            "drugSpec": "3ml:0.15g/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 25.52,
            "approvalDocumentNo": "国药准字J20180044",
            "drugManufactName": "Sanofi Winthrop Industrie",
            "drugFormCode": 10085,
            "drugBusiCode": "007P001600",
            "drugName": "盐酸胺碘酮注射液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 3,
            "retailPrice": 25.52
          },
          {
            "drugCode": 1304,
            "drugManufactCode": 1600760,
            "drugFormName": "滴眼液",
            "isBasicDrug": "0",
            "purchasePrice": 62.61,
            "disRetailPrice": 62.61,
            "dsUnitName": "支",
            "drugSpec": "80mg:20ml/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 62.61,
            "approvalDocumentNo": "国药准字J20100128",
            "drugManufactName": "参天制药株式会社",
            "drugFormCode": 10014,
            "drugBusiCode": "007Z001943",
            "drugName": "盐酸奥布卡因滴眼液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 4,
            "retailPrice": 62.61
          },
          {
            "drugCode": 1305,
            "drugManufactCode": 1600262,
            "drugFormName": "片剂",
            "isBasicDrug": "2",
            "purchasePrice": 41.18,
            "disRetailPrice": 2.9414,
            "dsUnitName": "盒",
            "drugSpec": "10mg*14片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "省补基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 2.9414,
            "approvalDocumentNo": "国药准字H20030514",
            "drugManufactName": "北京诺华制药有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007P001831",
            "drugName": "盐酸贝那普利片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 5,
            "retailPrice": 41.18
          },
          {
            "drugCode": 1306,
            "drugManufactCode": 1600761,
            "drugFormName": "注射液",
            "isBasicDrug": "2",
            "purchasePrice": 3.89,
            "disRetailPrice": 3.89,
            "dsUnitName": "瓶",
            "drugSpec": "250ml：20mg:2.25g/瓶",
            "dsUnitCode": "000111",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "省补基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "ml",
            "disPurchasePrice": 3.89,
            "approvalDocumentNo": "国药准字H23023509",
            "drugManufactName": "黑龙江中桂制药有限公司",
            "drugFormCode": 10085,
            "drugBusiCode": "007Z98849",
            "drugName": "盐酸倍他司汀氯化钠注射液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000010",
            "rn": 6,
            "retailPrice": 3.89
          },
          {
            "drugCode": 1307,
            "drugManufactCode": 1600762,
            "drugFormName": "口服液",
            "isBasicDrug": "0",
            "purchasePrice": 11.71,
            "disRetailPrice": 11.71,
            "dsUnitName": "瓶",
            "drugSpec": "30ml:0.15mg/瓶",
            "dsUnitCode": "000111",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 11.71,
            "approvalDocumentNo": "国药准字H20053903",
            "drugManufactName": "广东大冢制药有限公司",
            "drugFormCode": 10041,
            "drugBusiCode": "007Z987496",
            "drugName": "盐酸丙卡特罗口服溶液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 7,
            "retailPrice": 11.71
          },
          {
            "drugCode": 1308,
            "drugManufactCode": 1600839,
            "drugFormName": "片剂",
            "isBasicDrug": "2",
            "purchasePrice": 22.3,
            "disRetailPrice": 1.115,
            "dsUnitName": "盒",
            "drugSpec": "25ug*20片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "省补基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "ug",
            "disPurchasePrice": 1.115,
            "approvalDocumentNo": "国药准字H10930017",
            "drugManufactName": "浙江大冢制药有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007Z419103",
            "drugName": "盐酸丙卡特罗片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000005",
            "rn": 8,
            "retailPrice": 22.3
          },
          {
            "drugCode": 1309,
            "drugManufactCode": 1600326,
            "drugFormName": "软膏",
            "isBasicDrug": "0",
            "purchasePrice": 10.46,
            "disRetailPrice": 10.46,
            "dsUnitName": "支",
            "drugSpec": "10g:0.1g/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100030,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 10.46,
            "approvalDocumentNo": "国药准字H20031310",
            "drugManufactName": "鲁南贝特制药有限公司",
            "drugFormCode": 10059,
            "drugBusiCode": "007Z99005",
            "drugName": "盐酸布替萘芬乳膏",
            "drugTypeName": "普通",
            "drugCountryName": "川内",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 9,
            "retailPrice": 10.46
          },
          {
            "drugCode": 1310,
            "drugManufactCode": 1600694,
            "drugFormName": "胶浆剂",
            "isBasicDrug": "0",
            "purchasePrice": 21.8,
            "disRetailPrice": 21.8,
            "dsUnitName": "支",
            "drugSpec": "8g:0.08g/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 21.8,
            "approvalDocumentNo": "国药准字H61022993",
            "drugManufactName": "西安利君制药有限责任公司",
            "drugFormCode": 10027,
            "drugBusiCode": "007Z99030",
            "drugName": "盐酸丁卡因胶浆",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 10,
            "retailPrice": 21.8
          },
          {
            "drugCode": 1311,
            "drugManufactCode": 1600229,
            "drugFormName": "注射液",
            "isBasicDrug": "1",
            "purchasePrice": 6.1,
            "disRetailPrice": 6.1,
            "dsUnitName": "支",
            "drugSpec": "2ml:20mg/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 6.1,
            "approvalDocumentNo": "国药准字H20053297",
            "drugManufactName": "山东方明药业集团股份有限公司",
            "drugFormCode": 10085,
            "drugBusiCode": "1802026147",
            "drugName": "盐酸多巴酚丁胺注射液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 11,
            "retailPrice": 6.1
          },
          {
            "drugCode": 1312,
            "drugManufactCode": 1600765,
            "drugFormName": "片剂",
            "isBasicDrug": "0",
            "purchasePrice": 40.86,
            "disRetailPrice": 5.8371,
            "dsUnitName": "盒",
            "drugSpec": "5mg*7片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 5.8371,
            "approvalDocumentNo": "国药准字H20010723",
            "drugManufactName": "重庆植恩药业有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007Z987529",
            "drugName": "盐酸多奈哌齐片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 12,
            "retailPrice": 40.86
          },
          {
            "drugCode": 1313,
            "drugManufactCode": 1600554,
            "drugFormName": "片剂",
            "isBasicDrug": "1",
            "purchasePrice": 26.08,
            "disRetailPrice": 0.2608,
            "dsUnitName": "盒",
            "drugSpec": "25mg*100片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 0.2608,
            "approvalDocumentNo": "国药准字H32022163",
            "drugManufactName": "南京白敬宇制药有限责任公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007Z99092",
            "drugName": "盐酸多塞平片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 13,
            "retailPrice": 26.08
          }
        ],
        myValue: '2',
        myValu1e: '2',
        canEditCell: true
      }
    },
    mounted(){
      // for(var i=0;i<1000;i++){
      //   this.tableData.push({})
      // }
    },
    methods: {
      //row数据反写
      rowEnter(row, index, cellback) {
        this.$set(this.tableData, index, row);
        cellback("ok")
      },
      //加载更多数据 isLoading=true加载更多 isLoading=false 关键词筛选
      infinitescroll(keyword, isLoading) {
        console.log(keyword)
      },
      editCell(value, index) {
        this.$set(this.tableData[0], "drugSpec", value);
      },
      addRow(cellback) {
        this.tableData.push({});
        cellback("ok")
      },
      addTableData(){
        const children=this.$refs.table.$children;
        const childlen=children[children.length-1].$children.length;
        this.tableData.push({});
        this.$nextTick(()=>{
          const children1=this.$refs.table.$children;
          children1[children.length-1].$children[childlen+1].dbEdit(true);
        })
      },
      edit() {
        this.canEditCell = true;
      },
      cancelEdit() {
        this.canEditCell = false;
      }
    },
    computed: {
      options() {
        return [
          {
            "isDefault": 2,
            "code": 1,
            "tstatus": 1,
            "busiCode": "1",
            "tname": "完好",
            "selectType": "PUB_APPEARANCE_MODE",
            "tsort": 0,
            "nameShort": "WH"
          },
          {
            "isDefault": 2,
            "code": 2,
            "tstatus": 1,
            "busiCode": "2",
            "tname": "破损",
            "selectType": "PUB_APPEARANCE_MODE",
            "tsort": 0,
            "nameShort": "PS"
          },
          {
            "isDefault": 2,
            "code": 3,
            "tstatus": 1,
            "busiCode": "3",
            "tname": "轻微破损",
            "selectType": "PUB_APPEARANCE_MODE",
            "tsort": 0,
            "nameShort": "QWPS"
          }
        ]
      },
      column() {
        return [
          {label: '序号', prop: "rn", "width": "50", align: "right"},
          {label: '药品编码', prop: 'drugCode', align: 'left', width: '100'},
          {label: '药品名称', prop: 'drugName', align: 'left', width: '250'},
          {label: '药品规格', prop: 'drugSpec', align: 'left', width: '120'},
          {label: '库存数量', prop: 'dsStockCount', align: 'right', width: '120'},
          {label: '库房单位', prop: 'dsUnit', align: 'left', width: '120'},
          {label: '药品进价', prop: 'disPurchasePrice', align: 'right', width: '120'},
          {label: '药房拆零价', prop: 'disRetailPrice', align: 'right', width: '120'},
          {label: '有效期至', prop: 'prodDate', align: 'right', width: '120'},
          {label: '外观质量', prop: 'appearance', align: 'left', width: '120'},
          {label: '备注', prop: 'remark', align: 'left'},
        ]
      },
      columnData() {
        return [
          {
            "drugCode": 1275,
            "drugManufactCode": 1600662,
            "drugFormName": "胶囊剂",
            "isBasicDrug": "0",
            "purchasePrice": 146.48,
            "disRetailPrice": 20.9257,
            "dsUnitName": "盒",
            "drugSpec": "30mg*7粒/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100030,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 20.9257,
            "approvalDocumentNo": "国药准字H20123287",
            "drugManufactName": "四川绿叶制药股份有限公司",
            "drugFormCode": 10028,
            "drugBusiCode": "007Z98845",
            "drugName": "乌苯美司胶囊-TEST",
            "drugTypeName": "普通",
            "drugCountryName": "川内",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 1,
            "retailPrice": 146.48
          },
          {
            "drugCode": 1302,
            "drugManufactCode": 1600220,
            "drugFormName": "片剂",
            "isBasicDrug": "1",
            "purchasePrice": 24.69,
            "disRetailPrice": 2.469,
            "dsUnitName": "盒",
            "drugSpec": "0.2g*10片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 2.469,
            "approvalDocumentNo": "国药准字H19993254",
            "drugManufactName": "赛诺菲(杭州)制药有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007P001919",
            "drugName": "盐酸胺碘酮片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 2,
            "retailPrice": 24.69
          },
          {
            "drugCode": 1303,
            "drugManufactCode": 1100128,
            "drugFormName": "注射液",
            "isBasicDrug": "0",
            "purchasePrice": 25.52,
            "disRetailPrice": 25.52,
            "dsUnitName": "支",
            "drugSpec": "3ml:0.15g/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 25.52,
            "approvalDocumentNo": "国药准字J20180044",
            "drugManufactName": "Sanofi Winthrop Industrie",
            "drugFormCode": 10085,
            "drugBusiCode": "007P001600",
            "drugName": "盐酸胺碘酮注射液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 3,
            "retailPrice": 25.52
          },
          {
            "drugCode": 1304,
            "drugManufactCode": 1600760,
            "drugFormName": "滴眼液",
            "isBasicDrug": "0",
            "purchasePrice": 62.61,
            "disRetailPrice": 62.61,
            "dsUnitName": "支",
            "drugSpec": "80mg:20ml/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 62.61,
            "approvalDocumentNo": "国药准字J20100128",
            "drugManufactName": "参天制药株式会社",
            "drugFormCode": 10014,
            "drugBusiCode": "007Z001943",
            "drugName": "盐酸奥布卡因滴眼液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 4,
            "retailPrice": 62.61
          },
          {
            "drugCode": 1305,
            "drugManufactCode": 1600262,
            "drugFormName": "片剂",
            "isBasicDrug": "2",
            "purchasePrice": 41.18,
            "disRetailPrice": 2.9414,
            "dsUnitName": "盒",
            "drugSpec": "10mg*14片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "省补基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 2.9414,
            "approvalDocumentNo": "国药准字H20030514",
            "drugManufactName": "北京诺华制药有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007P001831",
            "drugName": "盐酸贝那普利片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 5,
            "retailPrice": 41.18
          },
          {
            "drugCode": 1306,
            "drugManufactCode": 1600761,
            "drugFormName": "注射液",
            "isBasicDrug": "2",
            "purchasePrice": 3.89,
            "disRetailPrice": 3.89,
            "dsUnitName": "瓶",
            "drugSpec": "250ml：20mg:2.25g/瓶",
            "dsUnitCode": "000111",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "省补基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "ml",
            "disPurchasePrice": 3.89,
            "approvalDocumentNo": "国药准字H23023509",
            "drugManufactName": "黑龙江中桂制药有限公司",
            "drugFormCode": 10085,
            "drugBusiCode": "007Z98849",
            "drugName": "盐酸倍他司汀氯化钠注射液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000010",
            "rn": 6,
            "retailPrice": 3.89
          },
          {
            "drugCode": 1307,
            "drugManufactCode": 1600762,
            "drugFormName": "口服液",
            "isBasicDrug": "0",
            "purchasePrice": 11.71,
            "disRetailPrice": 11.71,
            "dsUnitName": "瓶",
            "drugSpec": "30ml:0.15mg/瓶",
            "dsUnitCode": "000111",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 11.71,
            "approvalDocumentNo": "国药准字H20053903",
            "drugManufactName": "广东大冢制药有限公司",
            "drugFormCode": 10041,
            "drugBusiCode": "007Z987496",
            "drugName": "盐酸丙卡特罗口服溶液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 7,
            "retailPrice": 11.71
          },
          {
            "drugCode": 1308,
            "drugManufactCode": 1600839,
            "drugFormName": "片剂",
            "isBasicDrug": "2",
            "purchasePrice": 22.3,
            "disRetailPrice": 1.115,
            "dsUnitName": "盒",
            "drugSpec": "25ug*20片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "省补基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "ug",
            "disPurchasePrice": 1.115,
            "approvalDocumentNo": "国药准字H10930017",
            "drugManufactName": "浙江大冢制药有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007Z419103",
            "drugName": "盐酸丙卡特罗片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000005",
            "rn": 8,
            "retailPrice": 22.3
          },
          {
            "drugCode": 1309,
            "drugManufactCode": 1600326,
            "drugFormName": "软膏",
            "isBasicDrug": "0",
            "purchasePrice": 10.46,
            "disRetailPrice": 10.46,
            "dsUnitName": "支",
            "drugSpec": "10g:0.1g/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100030,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 10.46,
            "approvalDocumentNo": "国药准字H20031310",
            "drugManufactName": "鲁南贝特制药有限公司",
            "drugFormCode": 10059,
            "drugBusiCode": "007Z99005",
            "drugName": "盐酸布替萘芬乳膏",
            "drugTypeName": "普通",
            "drugCountryName": "川内",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 9,
            "retailPrice": 10.46
          },
          {
            "drugCode": 1310,
            "drugManufactCode": 1600694,
            "drugFormName": "胶浆剂",
            "isBasicDrug": "0",
            "purchasePrice": 21.8,
            "disRetailPrice": 21.8,
            "dsUnitName": "支",
            "drugSpec": "8g:0.08g/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 21.8,
            "approvalDocumentNo": "国药准字H61022993",
            "drugManufactName": "西安利君制药有限责任公司",
            "drugFormCode": 10027,
            "drugBusiCode": "007Z99030",
            "drugName": "盐酸丁卡因胶浆",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 10,
            "retailPrice": 21.8
          },
          {
            "drugCode": 1311,
            "drugManufactCode": 1600229,
            "drugFormName": "注射液",
            "isBasicDrug": "1",
            "purchasePrice": 6.1,
            "disRetailPrice": 6.1,
            "dsUnitName": "支",
            "drugSpec": "2ml:20mg/支",
            "dsUnitCode": "000115",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 6.1,
            "approvalDocumentNo": "国药准字H20053297",
            "drugManufactName": "山东方明药业集团股份有限公司",
            "drugFormCode": 10085,
            "drugBusiCode": "1802026147",
            "drugName": "盐酸多巴酚丁胺注射液",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 11,
            "retailPrice": 6.1
          },
          {
            "drugCode": 1312,
            "drugManufactCode": 1600765,
            "drugFormName": "片剂",
            "isBasicDrug": "0",
            "purchasePrice": 40.86,
            "disRetailPrice": 5.8371,
            "dsUnitName": "盒",
            "drugSpec": "5mg*7片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "非基药",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 5.8371,
            "approvalDocumentNo": "国药准字H20010723",
            "drugManufactName": "重庆植恩药业有限公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007Z987529",
            "drugName": "盐酸多奈哌齐片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 12,
            "retailPrice": 40.86
          },
          {
            "drugCode": 1313,
            "drugManufactCode": 1600554,
            "drugFormName": "片剂",
            "isBasicDrug": "1",
            "purchasePrice": 26.08,
            "disRetailPrice": 0.2608,
            "dsUnitName": "盒",
            "drugSpec": "25mg*100片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "mg",
            "disPurchasePrice": 0.2608,
            "approvalDocumentNo": "国药准字H32022163",
            "drugManufactName": "南京白敬宇制药有限责任公司",
            "drugFormCode": 10047,
            "drugBusiCode": "007Z99092",
            "drugName": "盐酸多塞平片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000006",
            "rn": 13,
            "retailPrice": 26.08
          },
          {
            "drugCode": 1314,
            "drugManufactCode": 1600768,
            "drugFormName": "肠溶片",
            "isBasicDrug": "1",
            "purchasePrice": 15.96,
            "disRetailPrice": 0.1596,
            "dsUnitName": "瓶",
            "drugSpec": "0.25*100片/瓶",
            "dsUnitCode": "000111",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 0.1596,
            "approvalDocumentNo": "国药准字H52020955",
            "drugManufactName": "贵州圣济堂制药有限公司",
            "drugFormCode": 10007,
            "drugBusiCode": "007Z001826",
            "drugName": "盐酸二甲双胍肠溶片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 14,
            "retailPrice": 15.96
          },
          {
            "drugCode": 1315,
            "drugManufactCode": 1100086,
            "drugFormName": "缓释片",
            "isBasicDrug": "1",
            "purchasePrice": 37,
            "disRetailPrice": 1.2333,
            "dsUnitName": "盒",
            "drugSpec": "0.5g*30片/盒",
            "dsUnitCode": "000104",
            "drugSupplierName": null,
            "drugClassName": "西药类",
            "drugAlias": null,
            "drugCountryCode": 100031,
            "isBasicDrugName": "国家基本药物",
            "drugTypeCode": 100002,
            "dosageUnitName": "g",
            "disPurchasePrice": 1.2333,
            "approvalDocumentNo": "国药准字H20051289",
            "drugManufactName": "悦康药业集团有限公司",
            "drugFormCode": 10024,
            "drugBusiCode": "007P001290",
            "drugName": "盐酸二甲双胍缓释片",
            "drugTypeName": "普通",
            "drugCountryName": "川外",
            "drugIndicatorCode": 10001,
            "drugSupplierCode": null,
            "dosageUnitCode": "000008",
            "rn": 15,
            "retailPrice": 37
          }
        ]
      }
    },
    components: {
      columnInput,
      columnDate,
      columnSelect,
      columnTable,
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        height: 500px;
        margin-top: 100px;
    }

    #app .el-table {
        overflow: inherit;
    }

    #app .el-table .cell {
        overflow: inherit;
    }

    .min-height {
        height: 23px;
    }
</style>
