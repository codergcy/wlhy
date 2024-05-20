/**
 * 常用服务
 * useful server
 */
const  icon_prefix="/static/home/128/"

export const us = {
  data:[
    {
      title:"挂车管理",
      icon:icon_prefix+"richang.png",
      description:"挂车管理",
      useCount:1000,
	  page:'carrier'
    },{
      title:"周报",
      icon:icon_prefix+"zhoubao.png",
      description:"总结每周的工作情况和下周计划",
      useCount:10000,
	  page:'helloWorld'
    },
  ]
}


/**
 * other server 其他服务
 */
export const os = {
  data:[
    {
      title:"新闻中心",
      icon:icon_prefix+"xinwen.png",
      description:"新闻中心",
      useCount:10000,
	  page:'helloWorld'
    },{
      title:"投票中心",
      icon:icon_prefix+"toupiao.png",
      description:"投票中心",
      useCount:10000,
	  page:'helloWorld'
    },
  ]
}