<template>
  <d2-container>
    <el-main class="main" direction="vertical">
      <section class="wrapper">
        <el-header class="header">专家信息</el-header>
        <el-main direction="vertical">
          <el-form :model="expertInfoForm" :rules="expertInfoFormRules" ref="expertInfoForm" label-width="auto" size="small">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="专家名称" prop="expertName" >
                  <el-input v-model="expertInfoForm.expertName" placeholder="请输入专家名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday" >
                  <el-date-picker value-format="yyyy-MM-dd" v-model="expertInfoForm.birthday" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="性别" prop="sex" >
                  <el-select v-model="expertInfoForm.sex" placeholder="请选择性别" style="width: 100%;">
                    <el-option v-for="(item, index) in sexArr" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学历" prop="educationalBackground" >
                  <el-select v-model="expertInfoForm.educationalBackground" placeholder="请选择学历" style="width: 100%;">
                    <el-option v-for="(item, index) in educationalBackgroundArr" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="毕业学校" prop="schoolTag" >
                  <el-input v-model="expertInfoForm.schoolTag" placeholder="请输入毕业学校"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所学专业" prop="major" >
                  <el-input v-model="expertInfoForm.major" placeholder="请输入所学专业"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="工作单位" prop="workUnit" >
                  <el-input v-model="expertInfoForm.workUnit" placeholder="请输入工作单位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="从事行业" prop="workIndustry" >
                  <el-input v-model="expertInfoForm.workIndustry" placeholder="请输入从事行业"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="职称" prop="title" >
                  <el-cascader
                    placeholder="请选择职称"
                    :options="expertTitleOptions"
                    @change="handleSelectTitle"
                    :show-all-levels="false"
                    v-model="expertInfoForm.title"
                    style="width: 100%;">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="任职日期" prop="officeDate" >
                  <el-date-picker value-format="yyyy-MM-dd" v-model="expertInfoForm.officeDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="电话号码" prop="phone" >
                  <el-input v-model="expertInfoForm.phone" placeholder="请输入电话号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱地址" prop="email" >
                  <el-input v-model="expertInfoForm.email" placeholder="请输入邮箱地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="证件类型" prop="idType" >
                  <el-select v-model="expertInfoForm.idType" placeholder="请选择证件类型" style="width: 100%;">
                    <el-option v-for="(item, index) in idTypeArr" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码" prop="idNumber" >
                  <el-input v-model="expertInfoForm.idNumber" placeholder="请输入证件号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所在地区" prop="region" >
                  <el-select v-model="expertInfoForm.region" placeholder="请选择所在地区" style="width: 100%;">
                    <el-option v-for="(item, index) in regionArr" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回避情形" prop="avoidSituation" >
                  <el-select v-model="expertInfoForm.avoidSituation" placeholder="请选择所在地区" style="width: 100%;">
                    <el-option v-for="(item, index) in avoidSituationArr" :key="index" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </section>
      <section class="wrapper">
        <el-header class="header">专家专业</el-header>
        <el-main direction="vertical">
          <el-form :model="expertProfessionForm" :rules="expertProfessionFormRules" ref="expertProfessionForm" label-width="auto" size="small">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddProfessionModal = true">新增专家专业</el-button>
            <el-dialog title="新增专家专业" :visible.sync="showAddProfessionModal" width="60%">
              <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="专家评标专业" prop="profession">
                      <el-cascader
                        placeholder="请选择专家评标专业"
                        @change="handleSelectProfession"
                        :options="expertProfessionOptions"
                        :show-all-levels="false"
                        v-model="expertProfessionForm.profession"
                        style="width: 100%;">
                      </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="状态" prop="status">
                    <el-select v-model="expertProfessionForm.status" placeholder="请选择状态" style="width: 100%;">
                      <el-option v-for="(item, index) in statusArr" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancelAddExpertProfession('expertProfessionForm')">取 消</el-button>
                <el-button type="primary" size="small" @click="handleAddExpertProfession('expertProfessionForm')">确 定</el-button>
              </div>
            </el-dialog>
          </el-form>
        </el-main>
        <el-table
          :data="expertProfessionForm.professionArr"
          size="small"
          style="width: 100%">
          <el-table-column label="序号" type="index" align="left">
          </el-table-column>
          <el-table-column label="专业名称" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.professionName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否有效" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleProfessionEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleProfessionDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="wrapper">
        <el-header class="header">回避单位</el-header>
        <el-main direction="vertical">
          <el-form :model="avoidUnitForm" :rules="avoidUnitFormRules" ref="avoidUnitForm" label-width="auto" size="small">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddAvoidUnitModal = true">新增回避单位</el-button>
            <el-dialog title="新增回避专业" :visible.sync="showAddAvoidUnitModal" width="60%">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业名称" prop="enterpriseName" >
                    <el-input v-model="avoidUnitForm.enterpriseName" placeholder="请输入企业名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" prop="devpOrgCode">
                  <el-form-item label="组织机构代码" prop="devpOrgCode" >
                    <el-input v-model="avoidUnitForm.devpOrgCode" placeholder="请输入组织机构代码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="回避原因" prop="avoidReason">
                <el-input v-model="avoidUnitForm.avoidReason" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
              </el-form-item>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleCancelAddAvoidUnit('avoidUnitForm')">取 消</el-button>
                <el-button type="primary" size="small" @click="handleAddAvoidUnit('avoidUnitForm')">确 定</el-button>
              </div>
            </el-dialog>
          </el-form>
        </el-main>
        <el-table
          :data="avoidUnitForm.avoidUnitArr"
          size="small"
          style="width: 100%">
          <el-table-column label="序号" type="index" align="left">
          </el-table-column>
          <el-table-column label="回避单位名称" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.enterpriseName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织机构代码" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.devpOrgCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleAvoidUnitEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleAvoidUnitDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="wrapper">
        <el-header class="header">附件信息</el-header>
        <el-main direction="vertical">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :on-error="handleError">
            <el-button type="primary" size="small" icon="el-icon-upload">点击上传附件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-main>
      </section>
      <el-button :loading="submitLoading" type="primary" size="small" class="submit" @click="submit">{{ submitLoading ? '提交中' : '提交' }}</el-button>
    </el-main>
  </d2-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import util from '@/libs/util'
export default {
  created () {
    this.fetchExpertTitle()
    this.fetchExpertProfession()
    this.loadExpertProfessionList()
    this.loadAvoidUnitList()
  },
  mounted () {},
  data () {
    const {
      expertId, // 专家 id
      expertName, // 专家名称
      birthdate, // 出生日期
      gender, // 性别
      educational, // 学历
      expertGraduate, // 毕业院校
      specialty, // 所学专业
      enterpriseName, // 工作单位
      expertProfessionId, // 从事行业
      expertTitleId, // 职称
      expertJobTitleTime, // 任职时间
      telephone, // 电话号码
      mail, // 邮箱地址
      credent, // 证件类型
      idNumber, // 证件号码
      area, // 所在地区
      operator // 回避情形
    } = JSON.parse(JSON.stringify(util.db.getState().sys.user['ghost-uuid'].user.info))
    const validatePhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        if (!(phoneReg.test(value) && value.length === 11)) {
          callback(new Error('手机号码不符合规则'))
        } else {
          callback()
        }
      }
    }
    const validateEmail = (rule, value, callback) => {
      const emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else {
        if (!emailReg.test(value)) {
          callback(new Error('邮箱地址不符合规则'))
        } else {
          callback()
        }
      }
    }
    return {
      // 专家信息开始
      sexArr: [
        { label: '男', value: '男' },
        { label: '女', value: '女' }
      ],
      educationalBackgroundArr: [
        { label: '博士', value: '博士' },
        { label: '硕士', value: '硕士' },
        { label: '学士', value: '学士' },
        { label: '大专', value: '大专' },
        { label: '高中', value: '高中' }
      ],
      idTypeArr: [
        { label: '身份证', value: '身份证' },
        { label: '军官证', value: '军官证' },
        { label: '护照', value: '护照' }
      ],
      regionArr: [
        { label: '西安', value: '西安' },
        { label: '宝鸡', value: '宝鸡' },
        { label: '咸阳', value: '咸阳' }
      ],
      avoidSituationArr: [
        { label: '存在利益关系', value: '存在利益关系' },
        { label: '存在亲属关系', value: '存在亲属关系' }
      ],
      expertId: expertId,
      expertInfoForm: {
        expertName: expertName !== null ? expertName : '',
        birthday: birthdate !== null ? birthdate : '',
        sex: gender !== null ? gender : '',
        educationalBackground: educational !== null ? educational : '',
        schoolTag: expertGraduate !== null ? expertGraduate : '',
        major: specialty !== null ? specialty : '',
        workUnit: enterpriseName !== null ? enterpriseName : '',
        workIndustry: expertProfessionId !== null ? expertProfessionId : '',
        title: expertTitleId !== undefined ? (expertTitleId instanceof Array ? expertTitleId : JSON.parse(expertTitleId)) : [],
        officeDate: expertJobTitleTime !== null ? expertJobTitleTime : '',
        phone: telephone !== null ? telephone : '',
        email: mail !== null ? mail : '',
        idType: credent !== null ? credent : '',
        idNumber: idNumber !== null ? idNumber : '',
        region: area !== null ? area : '',
        avoidSituation: operator !== null ? operator : ''
      },
      expertInfoFormRules: {
        expertName: [
          { required: true, message: '请输入专家名称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        educationalBackground: [
          { required: true, message: '请选择学历', trigger: 'change' }
        ],
        schoolTag: [
          { required: true, message: '请输入毕业院校', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入所学专业', trigger: 'blur' }
        ],
        workUnit: [
          { required: true, message: '请输入工作单位', trigger: 'blur' }
        ],
        workIndustry: [
          { required: true, message: '请输入从事行业', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请选择职称', trigger: 'blur' }
        ],
        officeDate: [
          { required: true, message: '请选择任职日期', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        idType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        idNumber: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择所在地区', trigger: 'change' }
        ],
        avoidSituation: [
          { required: true, message: '请选择回避情形', trigger: 'change' }
        ]
      },
      // 专家信息结束

      // 新增专家专业开始
      showAddProfessionModal: false,
      statusArr: [
        { label: '暂停', value: 'PAUSE' },
        { label: '正常', value: 'NORMAL' }
      ],
      expertProfessionForm: {
        profession: [],
        status: '',
        professionArr: []
      },
      expertProfessionFormRules: {
        profession: [
          { required: true, message: '请选择专家专业', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      // 新增专家专业结束

      // 新增回避单位开始
      showAddAvoidUnitModal: false,
      avoidUnitForm: {
        enterpriseName: '',
        devpOrgCode: '',
        avoidReason: '',
        avoidUnitArr: []
      },
      avoidUnitFormRules: {
        enterpriseName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        devpOrgCode: [
          { required: true, message: '请输入组织机构代码', trigger: 'blur' }
        ],
        avoidReason: [
          { required: true, message: '请输入回避原因', trigger: 'blur' }
        ]
      },
      // 新增回避单位结束

      // 附件信息开始

      // 附件信息结束

      // 控制按钮显示加载
      submitLoading: false
    }
  },
  computed: {
    ...mapState('d2admin', {
      expertTitleOptions: state => state.expert_info.expertTitleOptions,
      expertProfessionOptions: state => state.expert_info.expertProfessionOptions
    })
  },
  methods: {
    ...mapActions('d2admin/expert_info', [
      'fetchExpertTitle',
      'fetchExpertProfession',
      'fetchExpertProfessionList',
      'fetchAvoidUnitList',
      'addExpertProfession',
      'addAvoidUnit',
      'removeExpertProfession',
      'removeAvoidUnit',
      'submitExpertInfo'
    ]),
    // 获取专家专业列表数据
    loadExpertProfessionList () {
      this.fetchExpertProfessionList()
        .then(res => {
          if (res instanceof Array) {
            this.expertProfessionForm.professionArr = [...res]
          }
        })
    },
    // 获取回避单位列表数据
    loadAvoidUnitList () {
      this.fetchAvoidUnitList()
        .then(res => {
          if (res instanceof Array) {
            this.avoidUnitForm.avoidUnitArr = [...res]
          }
        })
    },
    // 专家信息开始
    handleSelectTitle (value) {
      console.log(value)
      this.expertInfoForm.title = value
    },
    submit () {
      this.$refs.expertInfoForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.submitExpertInfo({
            expertName: this.expertInfoForm.expertName,
            birthdate: this.expertInfoForm.birthday,
            gender: this.expertInfoForm.sex,
            educational: this.expertInfoForm.educationalBackground,
            expertGraduate: this.expertInfoForm.schoolTag,
            specialty: this.expertInfoForm.major,
            enterpriseName: this.expertInfoForm.workUnit,
            expertProfessionId: this.expertInfoForm.workIndustry,
            expertTitleId: JSON.stringify(this.expertInfoForm.title),
            expertJobTitleTime: this.expertInfoForm.officeDate,
            telephone: this.expertInfoForm.phone,
            mail: this.expertInfoForm.email,
            credent: this.expertInfoForm.idType,
            idNumber: this.expertInfoForm.idNumber,
            area: this.expertInfoForm.region,
            operator: this.expertInfoForm.avoidSituation
          })
            .then(res => {
              console.log('提交结果：', res)
              this.submitLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            })
        }
      })
    },
    // 专家信息结束

    // 新增专家专业开始
    handleSelectProfession (value) {
      console.log(value)
      this.expertProfessionForm.profession = value
    },
    handleCancelAddExpertProfession (formName) {
      this.showAddProfessionModal = false
      this.$refs[formName].resetFields()
    },
    handleAddExpertProfession (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addExpertProfession({
            expertId: this.expertId,
            professionId: this.expertProfessionForm.profession.pop(),
            status: this.expertProfessionForm.status === 'PAUSE' ? '无效' : '有效'
          })
            .then(async res => {
              if (res instanceof Array) {
                this.expertProfessionForm.professionArr = [...res]
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              } else {
                this.$message.error('保存失败')
              }
            })
          this.showAddProfessionModal = false
          this.$refs[formName].resetFields()
        }
      })
    },
    handleProfessionEdit (index, row) {
      this.$message({
        message: '保留功能',
        type: 'warning'
      })
    },
    handleProfessionDelete (index, row) {
      this.removeExpertProfession({
        expertIndustryId: row.expertIndustryId
      })
        .then(res => {
          if (res instanceof Array) {
            this.expertProfessionForm.professionArr = [...res]
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
    },
    // 新增专家专业结束

    // 新增回避单位开始
    handleCancelAddAvoidUnit (formName) {
      this.showAddAvoidUnitModal = false
      this.$refs[formName].resetFields()
    },
    handleAddAvoidUnit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const avoidUnit = {
            enterpriseName: this.avoidUnitForm.enterpriseName,
            devpOrgCode: this.avoidUnitForm.organizationCode,
            avoidReason: this.avoidUnitForm.avoidReason
          }
          this.addAvoidUnit({
            expertId: this.expertId,
            ...avoidUnit
          })
            .then(res => {
              if (res instanceof Array) {
                this.avoidUnitForm.avoidUnitArr = [...res]
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              } else {
                this.$message.error('保存失败')
              }
            })
          this.showAddAvoidUnitModal = false
          this.$refs[formName].resetFields()
        }
      })
    },
    handleAvoidUnitEdit (index, row) {
      console.log(index, row)
      this.$message({
        message: '保留功能',
        type: 'warning'
      })
    },
    handleAvoidUnitDelete (index, row) {
      this.removeAvoidUnit({
        expertAvoidUnitId: row.expertAvoidUnitId
      })
        .then(res => {
          if (res instanceof Array) {
            this.avoidUnitForm.avoidUnitArr = [...res]
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
    },
    // 新增回避单位结束

    // 附件信息开始
    handleChange (file, fileList) {
    },
    handleSuccess (response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleError (err, file, fileList) {
      console.log(err)
      console.log(file)
      console.log(fileList)
      this.$message.error('上传失败')
    }
    // 附件信息结束
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
    .bg-purple {
      background: #d3dce6;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .submit {
      position: absolute;
      right: 20px;
      margin: 20px;
    }
  }
</style>
