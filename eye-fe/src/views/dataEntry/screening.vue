<template>
  <div class="attachment01">
    		<table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td height="33" colspan="4"><p align="center" ><strong>海南省学生眼疾病初筛检查单（托幼机构使用）</strong><strong> </strong></p></td>
                  </tr>
                  <tr>
                    <td width="26%" height="28"><strong class="am_left">儿童姓名：</strong><div class="am_right"><input type="text" class="form-control" style="width:110px;"/></div></td>
                    <td colspan="2"><strong class="am_left">性别: </strong><div class="am_right"><input type="text" class="form-control"/></div>
                    <strong class="am_left">年龄：</strong><div class="am_right"><input type="text" class="form-control"/></div></td>
                    <td width="31%"><strong class="am_left">身份证：</strong>
                      <div class="am_right"><input type="text" class="form-control" style="width:180px;"/></div></td>
                  </tr>
                  <tr>
                    <td height="28"><strong class="am_left">家长电话：</strong>
                      <div class="am_right"><input type="text" class="form-control" style="width:110px;"/></div></td>
                    <td colspan="2"><strong class="am_left">机构名称：</strong><div class="am_right"><input type="text" class="form-control" style="width:180px;"/></div></td>
                    <td><strong class="am_left">幼儿园：</strong><div class="am_right"><input type="text" class="form-control" style="width:180px;"/></div></td>
                  </tr>
                  <tr>
                    <td height="28" colspan="2"><strong class="am_left">检查日期：</strong><strong><input type="text" class="form-control" style="width:55px; float:left;"/><a class="am_left">年</a><input type="text" class="form-control" style="width:55px; float:left;"/><a class="am_left">月</a><input type="text" class="form-control" style="width:55px; float:left;"/><a class="am_left">日</a></strong></td>
                    <td colspan="2"><strong class="am_left"><a class="am_left">配合程度：</a><input type="radio" name="zt" class="form-control" style="width:15px; height:15px;  float:left; margin-top:5px;"/><a class="am_left">良好</a><input type="radio" name="zt" class="form-control" style="width:15px; height:15px; float:left; margin-top:5px;"/><a class="am_left">一般</a><input type="radio" name="zt" class="form-control" style="width:15px; height:15px; float:left; margin-top:5px;"/><a class="am_left">不配合</a></strong></td>
                  </tr>
                  <tr>
                    <td height="100%" colspan="4">
                    <table width="100%" border="1" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="26%" height="31" align="center"><strong>筛查年龄段</strong><div></div></td>
                        <td width="43%" align="center"><p><strong>筛查内容</strong></p></td>
                        <td width="31%" align="center"><p><strong>筛查结果评估</strong></p></td>
                      </tr>
                      <tr>
                        <td height="120" rowspan="6" align="center"><p ><strong>3-6岁</strong></p></td>
                        <td height="33"><strong><a class="am_left leng200">眼睛结构及外观：</a><input type="text" class="form-control am_leng"/></strong></td>
                        <td rowspan="6">
                              <div class="am_left_w"><strong><input type="radio" name="zw" class="am_left" />正常</strong></div>
                              <div class="am_left_w"><strong><input type="radio"  name="zw"  class="am_left" />配合欠佳</strong></div>
                              <div class="am_left_w"><strong><input type="radio"  name="zw"  class="am_left" />（疑似）异常</strong></div>
                             <div class="am_left_w"><strong><input type="radio"  name="zw"  class="am_left" />医师签名：</strong></div>
                         </td>
                      </tr>
                      <tr>
                        <td height="30"><strong><a class="am_left leng200">眼位检查：</a><input type="text" class="form-control am_leng"/></strong></td>
                      </tr>
                      <tr>
                        <td height="30"><strong><a class="am_left leng200">眼球运动检查：</a><input type="text" class="form-control am_leng"/></strong></td>
                      </tr>
                      <tr>
                        <td height="30"><strong><a class="am_left">视物行为观察（3岁以下）：</a><input type="text" class="form-control am_leng"/></strong></td>
                      </tr>
                      <tr>
                        <td height="30"><strong><a class="am_left">视力筛查（4-6岁）：</a><a class="am_left">右眼：</a><input type="text" class="form-control" style="width:60px; float:left;"/><a class="am_left">左眼：</a><input type="text" class="form-control" style="width:60px; float:left;"/></strong></td>
                      </tr>
                      <tr>
                        <td height="80"><strong><a class="am_left">其他情况记录：</a><textarea name="a" class="form-control"  style=" width:260px; height:80px;"></textarea></strong></td>
                      </tr>
                      <tr>
                        <td height="93" colspan="3"><p >备注： </p>
                          <p>一、视力正常值：单眼视力：3岁（4.6-4.8）；4-6岁（4.8-4.9，部分5.0）。 <br />
                            双眼视力在视力表上相差两行及以上者可判定为（疑似）异常。 <br />
                        二、本检查为初步筛查，（疑似）异常请告知家长到指定机构进行复查。</p></td>
                      </tr>
                    </table></td>
                  </tr>
            </table>
</div>
</template>

<script>
export default {

}
</script>

<style>
/* CSS Document */
 b,body,dd,dl,dt,form,h1,h2,h3,h4,header,i,img,input,ol,p,rb,rt,ruby,section,ul{margin:0;padding:0;font-style:normal}
 body,h1,h2,html{font-family:"微软雅黑",Helvetica,STHeiTi,sans-serif;font-weight:400;line-height:1}
.attachment01{ width:900px; margin:0 auto;}
.am_left{ float:left; line-height:24px;}
.am_left_w{ float:left; width:100%; line-height:23px; padding-left:5px;}
.am_right input{ width:87px; height:25px; float:left;}
input{ height:25px; border:none; border-bottom:1px solid #CCC !important;}
p{margin-bottom:.2rem;}
.am_leng{ width:172px; float:left;}
.leng200{ width:200px; text-align:right;}
</style>
