<template>
  <d2-container>
    <el-main class="main" direction="vertical">
      <section class="wrapper">
        <el-header class="header">系统管理</el-header>
        <el-main direction="vertical">
          <el-form :model="systemForm" :rules="systemFormRules" ref="systemForm" label-width="auto" size="small">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddSystemModal = true">新增系统</el-button>
            <el-dialog title="新增系统" :visible.sync="showAddSystemModal" width="50%">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="系统名称" prop="systemName" >
                    <el-input v-model="systemForm.systemName" placeholder="请输入系统名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="系统编码" prop="systemCode" >
                    <el-input v-model="systemForm.systemCode" placeholder="请输入系统编码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="系统排序" prop="systemSort" >
                    <el-input v-model="systemForm.systemSort" placeholder="请输入系统排序"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="系统描述" prop="systemDescription" >
                    <el-input v-model="systemForm.systemDescription" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancelAddSystem('systemForm')">取 消</el-button>
                <el-button type="primary" size="small" @click="handleSystem('systemForm')">确 定</el-button>
              </div>
            </el-dialog>
          </el-form>
        </el-main>
        <el-table
          :data="systemForm.systemArr"
          size="small"
          style="width: 100%">
          <el-table-column label="序号" type="index" align="left">
          </el-table-column>
          <el-table-column label="系统名称" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sysName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统编码" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sysCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统排序" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.orderNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="系统描述" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleSystemEdit(scope.$index, scope.row, 'systemForm')">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleSystemDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-main>
  </d2-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    this.loadSystemList()
  },
  mounted () {},
  data () {
    return {
      systemForm: {
        systemId: '',
        systemName: '',
        systemCode: '',
        systemSort: '',
        systemDescription: '',
        systemArr: []
      },
      systemFormRules: {
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ],
        systemCode: [
          { required: true, message: '请输入系统编码', trigger: 'blur' }
        ],
        systemSort: [
          { required: true, message: '请输入系统排序', trigger: 'blur' }
        ],
        systemDescription: [
          { required: true, message: '请输入系统描述', trigger: 'blur' }
        ]
      },
      showAddSystemModal: false
    }
  },
  methods: {
    ...mapActions('d2admin/authority_system', [
      'addSystem',
      'removeSystem',
      'updateSystem',
      'fetchSystemList'
    ]),
    loadSystemList () {
      const data = {
        pageSize: 100,
        pageIndex: 1
      }
      this.fetchSystemList(data)
        .then(res => {
          if (res.rows instanceof Array) {
            this.systemForm.systemArr = [...res.rows]
          }
        })
    },
    handleCancelAddSystem (formName) {
      this.showAddSystemModal = false
      this.$refs[formName].resetFields()
    },
    handleSystem (formName) {
      if (this.systemForm.systemId !== '') {
        this.handleUpdateSystem(formName)
      } else {
        this.handleAddSystem(formName)
      }
    },
    handleAddSystem (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const system = {
            sysName: this.systemForm.systemName,
            sysCode: this.systemForm.systemCode,
            remark: this.systemForm.systemDescription,
            orderNum: this.systemForm.systemSort
          }
          this.addSystem(system)
            .then(async res => {
              if (res instanceof Array) {
                this.systemForm.systemArr = [...res]
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              } else {
                this.$message.error('保存失败')
              }
            })
          this.showAddSystemModal = false
          this.$refs[formName].resetFields()
        }
      })
    },
    handleSystemEdit (index, row) {
      this.systemForm.systemId = row.sysId
      this.systemForm.systemName = row.sysName
      this.systemForm.systemCode = row.sysCode
      this.systemForm.systemSort = row.orderNum
      this.systemForm.systemDescription = row.remark
      this.showAddSystemModal = true
    },
    handleUpdateSystem (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const system = {
            sysId: this.systemForm.systemId,
            sysName: this.systemForm.systemName,
            sysCode: this.systemForm.systemCode,
            remark: this.systemForm.systemDescription,
            orderNum: this.systemForm.systemSort
          }
          this.updateSystem(system)
            .then(async res => {
              if (res instanceof Array) {
                this.systemForm.systemArr = [...res]
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.$message.error('保存失败')
              }
            })
          this.showAddSystemModal = false
          this.$refs[formName].resetFields()
        }
      })
    },
    handleSystemDelete (index, row) {
      const data = {
        sysId: row.sysId
      }
      this.removeSystem(data)
        .then(res => {
          console.log('删除:', res)
          if (res instanceof Array) {
            this.systemForm.systemArr = [...res]
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除成功',
              type: 'warning'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding: 0px !important;
    .wrapper {
      border: 1px solid #cfd7e5;
      margin-top: 20px;
    }
    .header {
      padding: 0px;
      border-bottom: 1px solid #efefef;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }
</style>
