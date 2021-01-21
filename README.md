# PrintTemplate

## 更新 (多页模板)

[例子 2](https://xxllxx.github.io/PrintTemplate/example/index1.html)

```
多页模板属性

{

  name:'template1',
  unit:'mm',
  size:'a4',
  multiPage: true,  // treu :  多页模板  false : 默认 单页
  // 分页方式  传入打印每行的数据 分配模板打印数据
  pageMode: function (data) {
    // 例子2 判断 存在 phone 属性 打印 当前模板 和 template1 模板
    if (data.phone) {
      return [{ name: this.name, data }, { name: 'template1', data: { text: data.phone } }]
    }
    // 例子2 判断 不存存在 phone 属性 打印 当前模板 和 template2 模板
    return [{ name: this.name, data }, { name: 'template2' }]
  },
  // 关联 模板 ： 打印时验证存不存在模板 如果为空或模板为空 不生成pdf页
  linkTemplate: ['template1','template1'],
  ... // 其他属性
}

```

## 模板打印-套打

## 安装

```
yarn add print-template

或

npm install print-template

```

## 使用

```
import printTemplate from 'print-template'



let  template  = new printTemplate()


//添加模板
template.push({
  name:'template1', // 模板名称
  unit:'mm',        // 尺寸  mm / px
  size:'a4',        // a4 或 [221,291]
  fixed:[           // 固定的数据
    {
      type:'line' ,  // 类型 线条  line / text / image / barcode / qrcode
      x:10,          // x
      y:20,          // y
      length:10,     // 长度
      orientation:'l'// 方向 默认 l 横向  / p 竖向
    },
    {
      type:'text' ,         // 类型  文本 line / text / image / barcode / qrcode
      default:'张三',       // 默认值  \n 换行  或设置maxWidth大小
      x:10,                 // x
      y:20,                 // y
      fontSize:'20',        // 字体大小
      fontFamily:'微软雅黑', // 字体类型   默认 '微软雅黑'
      fontWeight:null,      // 字体宽度
      fontStyle:'normal',   // 字体样式 normal / 斜体
      maxWidth:null,        // 最大换行宽度
      orientation:'l'       // 方向 默认 l 横向  / p 竖向
    },
     {
      type:'image' ,        // 图片  文本 line / text / image / barcode / qrcode
      default:'图片地址',    // *默认值  图片地址 或 base64
      x:10,                 // *x
      y:20,                 // *y
      width: 25,            // *宽度
      height: 25,           // *高度
    },
    {
      type:'barcode' ,      // 条形码  文本 line / text / image / barcode / qrcode
      default:'OK111111',   // *默认值  条形码值
      x:10,                 // *x
      y:20,                 // *y
      width: 3,             // *线宽
      height: 25,           // *高度
      format: 'CODE128A',   // 条形码格式
      fontOptions: 'bold'   // 粗体   bold / italic / bold  italic
    },
    {
      type:'qrcode' ,      // *条形码  文本 line / text / image / barcode / qrcode
      default:'二维码文本',  // *默认值
      x:10,                 // *x
      y:20,                 // *y
      width: 25,            // *宽度
    }

  ],
  data:{                    // 动态数据
    code1: {                // 传入数据的属性名称
      type:'barcode' ,      // 条形码  文本 line / text / image / barcode / qrcode
      x:10,                 // *x
      y:20,                 // *y
      width: 3,            // *线宽度
      height: 25,           // *高度
      format: 'CODE128A',   // 条形码格式
    },
    code2:{                 // 传入数据的属性名称
      type:'qrcode' ,       // *条形码  文本 line / text / image / barcode / qrcode
      x:10,                 // *x
      y:20,                 // *y
      width: 25,            // *宽度
    }

  }

})

// 打印模板
// 异步方法 返回 jspdf
let pdf = await template.print(
  'template1',          // 刚才添加的模板名称
  [                     // 打印数据  {} 或 [{},{},{}]
    {
      code:'YOO11111111',  // 条形码 CODE128A 类型 大写字母加数字
      code2:'记得start',   // 二维码
    },
     {
      code:'T00222222',  // 条形码 CODE128A 类型 大写字母加数字
      code2:'记得start',   // 二维码
    }
  ])


// 下载 / 预览

// blob 地址
let uri = pdf.output('bloburi', { filename: '打印文件' });

// 下载
let fileName = 'test'
pdf.save( fileName ||'打印文件' );

```

## 例子

[例子 1](https://xxllxx.github.io/PrintTemplate/example/)

[例子 2 (多页模板)](https://xxllxx.github.io/PrintTemplate/example/index1.html)
