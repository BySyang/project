webpackJsonp([2],{NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"App"},s,!1,function(e){n("ZVQ4")},null,null).exports,a=n("/ocq"),r=n("mw3O"),l=n.n(r),m={name:"login",data:function(){return{img:"images/login/566ae08210a96.jpg",_dom:"",isRemeber:"",username:"",password:""}},computed:{},created:function(){"true"==window.localStorage.getItem("isRemeber")?this.isRemeber=!0:this.isRemeber=!1,this.isRemeber&&(this.username=window.localStorage.getItem("logName"),this.password=window.localStorage.getItem("logPwd"))},methods:{submitForm:function(){var e=this;this.$http.post("adminLog",l.a.stringify({logName:this.username,logPwd:this.password})).then(function(t){"ok"==t.data&&(window.sessionStorage.setItem("isLog","true"),e.remeberAdmin(),e.$route.query.redirect?e.$router.push(e.$route.query.redirect.replace(/%2F/g,"/")):e.$router.push("/home"))}).catch(function(e){console.log(e)})},resetForm:function(){this.username="",this.password=""},remeberAdmin:function(){this.isRemeber?(window.localStorage.setItem("isRemeber",!0),window.localStorage.setItem("logName",this.username),window.localStorage.setItem("logPwd",this.password)):(window.localStorage.setItem("isRemeber",!1),window.localStorage.removeItem("logName"),window.localStorage.removeItem("logPwd"))}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"login"}},[n("img",{attrs:{src:e.img,alt:"",id:"myvideo"}}),e._v(" "),n("h2",[e._v("管理员登录系统")]),e._v(" "),n("div",{staticClass:"wrap"},[n("el-form",{ref:"ruleForm",attrs:{"label-width":"70px"}},[n("div",{staticClass:"input"},[n("p",[e._v("用户名")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"请输入用户名"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"input"},[n("p",[e._v("密码")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),e._v(" "),n("div",{staticClass:"remeber"},[n("el-form-item",{staticClass:"rem",attrs:{label:"记住密码"}},[n("el-switch",{model:{value:e.isRemeber,callback:function(t){e.isRemeber=t},expression:"isRemeber"}})],1)],1),e._v(" "),n("div",{staticClass:"login_btn"},[n("el-form-item",{staticClass:"login_btn_a"},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.submitForm}},[e._v("登录")]),e._v(" "),n("el-button",{attrs:{size:"small"},on:{click:e.resetForm}},[e._v("重置")])],1)],1)])],1)])},staticRenderFns:[]};var c=n("VU/8")(m,u,!1,function(e){n("theX")},"data-v-3b6a595a",null).exports,d={data:function(){return{show:!1,el:"#home",img:n("pmaA"),ruleForm:{name:""},rules:{name:[{required:!0,message:"请输入原密码",trigger:"blur"},{min:3,max:7,message:"长度在 3 到 5 个字符",trigger:"blur"}],name2:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:3,max:7,message:"长度在 3 到 5 个字符",trigger:"blur"}],name3:[{required:!0,message:"请确认密码",trigger:"blur"},{min:3,max:7,message:"长度在 3 到 5 个字符",trigger:"blur"}]}}},created:function(){"home"==this.$route.name&&this.$router.replace("/home/index")},methods:{exit:function(){var e=this,t=this.$createElement;this.$msgbox({center:"true",message:t("p",{style:"margin-bottom:20px;font-size:16px;"},[t("span",null,"您确定要退出登录系统吗")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(t,n,o){"confirm"===t?(n.confirmButtonLoading=!0,n.confirmButtonText="退出中..",setTimeout(function(){o(),window.sessionStorage.removeItem("isLog"),e.$router.push("/login"),console.log("111"),setTimeout(function(){n.confirmButtonLoading=!1},300)},1500)):o()}}).then(function(t){e.$message({type:"success",message:"退出成功"})})},toggle:function(){this.isshow=!this.isshow},handleOpen:function(e,t){this.$router.push(e)},handleClose:function(e,t){this.$router.push(e)},handleCommand:function(e){this.$message("click on item "+e)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){t.$http.post("adminLog",l.a.stringify({logName:t.username,logPwd:t.password}));var n=t.$createElement;window.localStorage.getItem("isRemeber");var o=t;t.$message({type:"success",duration:"1500",center:"true",message:n("p",null,[n("span",null,"密码修改成功,请重新登录")]),onClose:function(){window.sessionStorage.removeItem("isLog"),o.$router.push("/login"),o.isRemeber=!1,console.log(o.isRemeber),console.log("2222")}})}else t.$message({type:"error",color:"#f0f0f0",duration:"1500",center:"true",message:h("p",null,[h("span",null,"密码修改失败，请重新修改")]),onClose:function(){}})})},resetForm:function(e){this.$refs[e].resetFields(),console.log("密码被重置呢")}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"home"}},[n("el-container",{staticClass:"section1"},[n("el-header",[n("div",{staticClass:"log"},[n("i",{staticClass:"iconfont icon-lifangtilitiduomiantifangkuai2"}),e._v(" "),n("span",[e._v("Fashion Girl")]),e._v(" "),n("span",[e._v("管理系统")])]),e._v(" "),n("div",{staticClass:"log_item"},[n("img",{attrs:{src:e.img}}),e._v(" "),n("i",{staticClass:"iconfont icon-xiugai",on:{click:function(t){e.show=!e.show}}}),e._v(" "),n("a",{staticClass:"iconfont icon-liulanqi-IE",attrs:{href:"http://localhost:8080"}}),e._v(" "),n("i",{staticClass:"iconfont icon-swticontuichu1",on:{click:function(t){e.exit()}}})])]),e._v(" "),n("transition",{attrs:{name:"slide-fade"}},[e.show?n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[n("el-form-item",{attrs:{prop:"name"}},[n("el-input",{attrs:{placeholder:"原密码",size:"small"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"name2"}},[n("el-input",{attrs:{placeholder:"新密码",size:"small"},model:{value:e.ruleForm.name2,callback:function(t){e.$set(e.ruleForm,"name2",t)},expression:"ruleForm.name2"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"name3"}},[n("el-input",{attrs:{placeholder:"重复新密码",size:"small"},model:{value:e.ruleForm.name3,callback:function(t){e.$set(e.ruleForm,"name3",t)},expression:"ruleForm.name3"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("修改密码")]),e._v(" "),n("el-button",{attrs:{type:"info",size:"small"},on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1):e._e()],1),e._v(" "),n("el-container",{staticClass:"section2"},[n("el-aside",{attrs:{width:"200px"}},[n("el-row",{staticClass:"tac"},[n("el-menu",{attrs:{router:"","default-active":e.$route.path,"unique-opened":"","background-color":"#001529 ","text-color":"#fff","active-text-color":"#20a0ff"},on:{open:e.handleOpen,close:e.handleClose}},[n("el-menu-item",{attrs:{index:"/home/index"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-fl-jia"}),e._v("首页")])]),e._v(" "),n("el-menu-item",{attrs:{index:"/home/userInfo"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-erji-yonghuguanli"}),e._v("会员信息")])]),e._v(" "),n("el-submenu",{attrs:{index:"/home/goodsClass"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-shangpinguanli"}),e._v("商品管理")]),e._v(" "),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"/home/goodsClass"}},[e._v("商品分类")]),e._v(" "),n("el-menu-item",{attrs:{index:"/home/goodsAdd"}},[e._v("添加商品")])],1)],1),e._v(" "),n("el-submenu",{attrs:{index:"/home/orders"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-jiaoyi"}),e._v("交易管理")]),e._v(" "),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"/home/orders"}},[e._v("订单管理")]),e._v(" "),n("el-menu-item",{attrs:{index:"/home/afterSales"}},[e._v("售后服务")]),e._v(" "),n("el-menu-item",{attrs:{index:"/home/wuliu"}},[e._v("物流管理")])],1)],1),e._v(" "),n("el-submenu",{attrs:{index:"/home/pays"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-zhifu"}),e._v("支付管理")]),e._v(" "),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"/home/pays"}},[e._v("支付管理")]),e._v(" "),n("el-menu-item",{attrs:{index:"/home/payConfig"}},[e._v("其他配置")])],1)],1),e._v(" "),n("el-menu-item",{attrs:{index:"/home/comments"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-pinglun"}),e._v("评论管理")])]),e._v(" "),n("el-submenu",{attrs:{index:"/home/web"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-qianduanyingyong"}),e._v("前端管理")]),e._v(" "),n("el-menu-item-group",[n("el-menu-item",{attrs:{index:"/home/web"}},[e._v("栏目管理")])],1)],1),e._v(" "),n("el-menu-item",{attrs:{index:"/home/logs"}},[n("span",{attrs:{slot:"title"},slot:"title"},[n("i",{staticClass:"iconfont icon-rizhiguanli"}),e._v("系统日志")])])],1)],1)],1),e._v(" "),n("el-main",[n("router-view")],1)],1)],1)],1)},staticRenderFns:[]};var f=n("VU/8")(d,p,!1,function(e){n("g6AO")},"data-v-19d23fba",null).exports,g=[{path:"index",name:"index",component:function(){return n.e(0).then(n.bind(null,"dAjm"))},meta:{title:"首页"}},{path:"userInfo",name:"userInfo",component:function(){return n.e(0).then(n.bind(null,"DF6U"))},meta:{title:"用户管理"}},{path:"goodsClass",name:"goodsClass",component:function(){return n.e(0).then(n.bind(null,"TVel"))},meta:{title:"商品分类"}},{path:"goodsAdd",name:"goodsAdd",component:function(){return n.e(0).then(n.bind(null,"SQ0L"))},meta:{title:"商品添加"}},{path:"comments",name:"comments",component:function(){return n.e(0).then(n.bind(null,"6rV5"))},meta:{title:"评论管理"}},{path:"orders",name:"orders",component:function(){return n.e(0).then(n.bind(null,"H1kL"))},meta:{title:"订单管理"}},{path:"pays",name:"pays",component:function(){return n.e(0).then(n.bind(null,"UyeM"))},meta:{title:"支付管理"}},{path:"web",name:"web",component:function(){return n.e(0).then(n.bind(null,"5s3X"))},meta:{title:"前端管理"}},{path:"logs",name:"logs",component:function(){return n.e(0).then(n.bind(null,"VXuX"))},meta:{title:"系统日志"}},{path:"payConfig",name:"payConfig",component:function(){return n.e(0).then(n.bind(null,"8uzL"))},meta:{title:"支付配置"}},{path:"wuliu",name:"wuliu",component:function(){return n.e(0).then(n.bind(null,"FDal"))},meta:{title:"物流管理"}},{path:"afterSales",name:"afterSales",component:function(){return n.e(0).then(n.bind(null,"VBJl"))},meta:{title:"售后服务"}}];o.default.use(a.a);var v=new a.a({mode:"hash",routes:[{path:"/login",name:"login",component:c,meta:{title:"登录"}},{path:"/home",name:"home",component:f,children:g,meta:{title:"后台首页",isVerify:!0}},{path:"/",redirect:"/login"}]});v.beforeEach(function(e,t,n){var o="true"==window.sessionStorage.getItem("isLog");e.matched.some(function(e){return e.meta.isVerify})?o?n():n({name:"login",query:{redirect:e.fullPath}}):n(),document.title=e.meta.title});var _,w=v,b=n("//Fk"),x=n.n(b),C=n("mtWM"),y=n.n(C),F=n("zL8q"),$=n.n(F);y.a.defaults.timeout=5e3,y.a.defaults.baseURL="http://localhost:8080",y.a.interceptors.request.use(function(e){return _=F.Loading.service({fullscreen:!0}),e},function(e){return _.close(),F.Message.error({message:"加载超时"}),x.a.reject(e)}),y.a.interceptors.response.use(function(e){return _.close(),e},function(e){return _.close(),F.Message.error({message:"加载失败"}),x.a.reject(e)});var R=y.a;n("tvR6");o.default.config.productionTip=!1,o.default.use($.a),o.default.prototype.$http=R,new o.default({el:"#app",router:w,render:function(e){return e(i)}})},ZVQ4:function(e,t){},g6AO:function(e,t){},pmaA:function(e,t,n){e.exports=n.p+"img/personal.e0bbc88.jpeg"},theX:function(e,t){},tvR6:function(e,t){}},["NHnr"]);