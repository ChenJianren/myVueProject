<template>
  <div class="edit">
    <el-form ref="ruleForm" :model="form"  :rules="rules" label-width="80px">
      <el-form-item label="内容标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="副标题" prop="sub_title">
        <el-input v-model="form.sub_title"></el-input>
      </el-form-item>
      <el-form-item label="所属类别" prop="category_id">
        <el-select v-model="form.category_id" :label="form.category_id" placeholder="请选择">
          <el-option v-for="(item,index) in categoryList" :key="index" :label="item.title" :value="item.category_id">
            <span>
              <span v-if="item.class_layer != 1">|- </span>
              <span>{{item.title}}</span>
            </span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="推荐类型">
        <el-switch v-model="form.is_slide" inactive-text="轮播图"></el-switch>
        <el-switch v-model="form.is_top" inactive-text="置顶"></el-switch>
        <el-switch v-model="form.is_hot" inactive-text="推荐"></el-switch>
      </el-form-item>
      <el-form-item label="上传封面" prop="imgList">
        <el-upload
          class="upload-demo"
          action="http://111.230.36.92:8888/admin/article/uploadimg"
          :on-success='imgUpload'
          :file-list="form.imgList"
          :on-remove="handleRemove"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传附件">
        <el-upload
          class="upload-demo"
          action="http://111.230.36.92:8888/admin/article/uploadfile"
          :on-success='fileUpload'
          :file-list="form.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品货号" prop="goods_no">
         <el-input v-model="form.goods_no"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="stock_quantity">
         <el-input v-model="form.stock_quantity"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
         <el-input v-model="form.market_price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="sell_price">
         <el-input v-model="form.sell_price"></el-input>
      </el-form-item>
      <el-form-item label="内容摘要" prop="zhaiyao">
         <el-input type="textarea" v-model="form.zhaiyao"></el-input>
      </el-form-item>
      <el-form-item label="详细内容" prop="content">
         <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button>返回上一页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      id: this.$route.params.id,
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 100, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        sub_title: [
          { required: true, message: "请输入副标题", trigger: "blur" },
          { min: 5, max: 100, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
          { type: "number", message: "值必须为数字", trigger: "blur" }
        ],
        goods_no: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
        stock_quantity: [{ required: true, message: "请输入库存", trigger: "blur" }],
        market_price: [{ required: true, message: "请输入市场价", trigger: "blur" }],
        sell_price: [{ required: true, message: "请输入销售价", trigger: "blur" }],
        zhaiyao: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        content: [{ required: true, message: "请输入描述信息", trigger: "blur" }]
      },
      form: {},
      categoryList: []
    };
  },
  methods: {
    handleRemove(file) {
      let removeUrl = file.url;
      this.form.imgList = this.form.imgList.filter(val => val.url != removeUrl);
      console.log(this.form.imgList);
    },
    imgUpload(res, file, fileList) {
      res.url = res.url.replace(/127.0.0.1:8899/, "111.230.36.92:8888");
      this.form.imgList = [res];
    },
    fileUpload(res, file, fileList2) {
      res.url = res.url.replace(/127.0.0.1:8899/, "111.230.36.92:8888");
      this.form.fileList.push(res);
    },
    getContentByID() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        this.form = res.data.message;
        this.form.category_id = +res.data.message.category_id;
        this.form.imgList[0].url =
          "http://111.230.36.92:8888/" + res.data.message.imgList[0].shorturl;
      });
    },
    getCategory() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        this.categoryList = res.data.message;
      });
    },
    edit() {
      this.$http.post(this.$api.gsEdit + this.id, this.form).then(res => {
        if (res.data.status == 0) {
          this.$alert("马上跳回商品列表页", "修改成功", {
            confirmButtonText: "确定",
            callback: action => {
              this.$router.push({ name: "goodsCtList" });
            }
          });
        }
      });
    },
    add() {
      this.$http
        .post(this.$api.gsAdd, this.form)
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$alert("马上跳回商品列表页", "新增成功", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ name: "goodsCtList" });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id == null) {
            this.add();
          } else {
            this.edit();
          }
        } else {
          console.log(this.id);
          this.$alert("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    }
  },
  created() {
    if (this.id != null) {
      this.getContentByID();
    }
    this.getCategory();
  }
};
</script>

<style scoped lang="less">
.edit {
  width: 800px;
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 20px;
}
</style>