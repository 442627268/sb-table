/**
* Created by renlinfei on 2019-09-23.
*/
<template>
  <div id="app">
    <!--:data-size="tableData.length" v-loadmore="handelLoadmore"-->
    <el-table
      ref="table"
      :data="tableData"
      height="700px"

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
          <!--
          isColumn:是否列编辑
          @addRow 添加一样的时候自动弹出表格
          width：弹出表格的宽度
          @rowEnter 选择表格里面的行数据的回调
          @infinitescroll 加载更多和关键词查询
          column：弹出的表格-表格字段
          columnData：弹出表格-表格中的数据
          canEditCell：开启表格编辑和关闭表格编辑
          -->
          <column-table
            :isColumn="isColumn"
            :key="scope.$index"
            @addRow="addRow"
            width="700px"
            @rowEnter="(row,cellback)=>rowEnter(row,scope.$index,cellback)"
            @infinitescroll="infinitescroll"
            :column="column"
            :columnData="columnData"
            v-model="scope.row.drugName"
            :canEditCell="canEditCell">

          </column-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="drugSpec"
        show-overflow-tooltip
        width="180"
        label="药品规格">
        <template slot-scope="scope">
          <!--
          @editCell 编辑中的回调，如果编辑 需要验证和处理数据就需要用到此函数 无这些需求可以不要这个函数
          @editBlur 编辑后离开回调 同上
          @addRow 添加一行的时候自动focus文本框中
          -->
          <column-input :key="scope.$index"
                        @editCell="(val)=>editCell(val,scope.$index)"
                        @editBlur="(val)=>editBlur(val,scope.$index)"
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
          <column-input :key="scope.$index" :isColumn="isColumn" v-model="scope.row.drugCountryCodeStr"
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
          <!--
          defaultItem 下拉的默认字段 可不传 默认是 {value: "value",label: "label"}
          selectData 下拉的数据
          defaultStr 显示的中文字段 因为v-model 绑定的是code
          -->
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
