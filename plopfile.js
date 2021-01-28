module.exports = function (plop) {
  plop.setHelper('upperCase', function (text) {
		return text[0].toUpperCase() + text.substr(1)
  })
  // 当v1小于v2返回
  plop.setHelper('compare', function (v1, v2, options) {
    v1++
		if (v1 < v2){
      return options.fn(this); // 满足条件执行，返回 this 数据
    } else {
      return options.inverse(this); // 不满足条件执行，不返回 this 数据
    }
  })

  plop.setGenerator('view', {
		prompts: [
      {
        type: 'input',
        name: 'parent',
        message: '请输入视图文件的父文件夹：'
      },
      {
        type: 'input',
        name: 'name',
        message: '请输入视图名称：'
      }
    ],
    actions: data => {
      const config = require('./plop-templates/config/' + data.name)

      const actions = []
      actions.push(
        {
          type: 'add',
          path: 'src/views/{{parent}}/{{name}}.vue',
          templateFile: 'plop-templates/view/index.hbs',
          data: config,
          force: true
        }
      )

      actions.push({
        type: 'add',
        path: 'src/api/{{name}}.js',
        templateFile: 'plop-templates/api/index.hbs',
        force: true
      })

      return actions
    }
		// actions: [
      // {
      //   type: 'add',
      //   path: 'src/views/{{parent}}/{{name}}.vue',
      //   templateFile: 'plop-templates/view/index.hbs',
      //   data: {
      //     abc: 'xx'
      //   }
      // },
    //   {
        // type: 'add',
        // path: 'src/api/{{name}}.js',
        // templateFile: 'plop-templates/api/index.hbs'
    //   }
    // ]
	})
}
