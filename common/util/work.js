/**
 * 常用服务
 * useful server
 */
const  icon_prefix="/static/home/128/"

export const us = {
  data:[
    {
      title:"承运人管理",
      icon:icon_prefix+"richang.png",
      description:"承运人管理",
      useCount:1000,
	  page:'carrier'
    },{
      title:"车辆管理",
      icon:icon_prefix+"zhoubao.png",
      description:"车辆管理",
      useCount:10000,
	  page:'driver'
    },
  ]
}


/**
 * other server 其他服务
 */
export const os = {
  data:[
    {
      title:"车辆管理",
      icon:icon_prefix+"xinwen.png",
      description:"车辆管理",
      useCount:10000,
	  page:'vehicle'
    },{
      title:"挂车管理",
      icon:icon_prefix+"toupiao.png",
      description:"挂车管理",
      useCount:10000,
	  page:'trailer'
    },
  ]
}