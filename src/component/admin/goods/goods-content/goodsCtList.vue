<template>
  <div>
      <div class="daohang">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>购物商城</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="btnList">
         <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
         <el-button plain size="mini" icon="el-icon-check" @change="checkAll">全选</el-button>
         <el-button plain size="mini" icon="el-icon-delete">删除</el-button>
         <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="getListQuery.searchvalue" @blur="getGoodsList()"></el-input>
      </div>
      <el-table :data="tableData" border ref="multipleTable" tooltip-effect="dark" style="width: 100%" header-cell-style="backgroundColor:#eef1f6;border-color:#dfe6ec">
        <el-table-column type="selection" width="35"> </el-table-column>
        <el-table-column label="标题" prop="title">
          
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="right">
              <div slot="content">
                <img style="width:200px" :src="'http://111.230.36.92:8888' + scope.row.img_url" alt="图片预览">
              </div>
              <router-link :to="{name:'goodsCgEdit',params:{id:scope.row.id}}">{{scope.row.title}}</router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="所属类别" width="100" prop="categoryname"> </el-table-column>
        <el-table-column label="库存" width="100" prop="stock_quantity"> </el-table-column>
        <el-table-column label="市场价" width="100" prop="market_price"> </el-table-column>
        <el-table-column label="销售价" width="100" prop="sell_price"> </el-table-column>
        <el-table-column label="属性" width="100">
          <template slot-scope="scope">
            <i :class="['el-icon-picture',scope.row.is_slide==1?'active':'']"
              @click="editType(scope.row.id,'is_slide',scope.row.is_slide==1?false:true)">
            </i>
            <i :class="['el-icon-upload',scope.row.is_top==1?'active':'']"
              @click="editType(scope.row.id,'is_top',scope.row.is_top==1?false:true)">
              </i>
            <i :class="['el-icon-star-on',scope.row.is_hot==1?'active':'']"
              @click="editType(scope.row.id,'is_hot',scope.row.is_hot==1?false:true)">
              </i>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <router-link :to="{name:'goodsCgEdit',params:{id:scope.row.id}}">删除</router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
       @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="getListQuery.pageIndex" :page-sizes="[5,10,20,30,40]"
      :page-size="getListQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcount">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      getListQuery: {
        pageIndex: 1,
        pageSize: 5,
        searchvalue: ""
      },
      totalcount: 0
    };
  },
  methods: {
    checkAll() {},
    getGoodsList() {
      this.$http
        .get(this.$api.gsList, { params: this.getListQuery })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    },
    editType(id, type, status) {
      // this.$http.post(this.$api.gsEdit+id,{[type]:status,"fileList":[]}).then(res=>{console.log(res.data.message);})
      this.tableData.filter(data => data.id == id)[0][type] = status ? 1 : 0;
    },
    handleSizeChange(val) {
      this.getListQuery.pageSize = val;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      this.getListQuery.pageIndex = val;
      this.getGoodsList();
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style scoped lang="less">
.active {
  color: #0094ff;
}
.daohang {
  height: 25px;
  border-bottom: 1px solid #eee;
}
.btnList {
  height: 50px;
  line-height: 48px;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 0 15px;
  margin: 10px 0;
  .el-input {
    width: 180px;
    float: right;
  }
}
.cell {
  a {
    text-decoration: none;
    color: #0094ff;
  }
}
.el-pagination {
  padding: 10px 5px;
}
</style>