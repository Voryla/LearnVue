// 定义一个名为button-counter的新组件
// 全局组件
// 全局组件：全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
// 当一个组件创建后，可以在所以的Vue实例中多次使用，每个组件都会有各自的内存空间，维护各自的数据，因为每用一次组件，就会有一个它的新实例被创建
// 因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。
// 仅有的例外是像 el 这样根实例才能特有的选项。
Vue.component('button-counter', {
    // 自定义组件中data必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">you click me {{count}} times</button>'
})


// 通过Prop向子组件传递数据
/*
* 早些时候，我们提到了创建一个博文组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。
* Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。为了给博文组件传递一个标题，我们可以用一个 props 选项将其包含在该组件可接受的 prop 列表中：
* 一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样。
*/
Vue.component('blog-post', {
    props: ['title', 'time'],
    // 在构建模板时，远不止一个标题，最起码还要有这篇博文的正文
    template: '<h3>{{title}}-{{time}}</h3>'
});

Vue.component('blog-posts', {
    props: ['post'],
    template: ' <div>\n' +
        '      <h3>{{ post.title }}-{{post.time}}</h3>\n' +
        '  <button v-on:click="$emit(\'enlarge-text\',0.1)">\n' +
        '        Enlarge text\n' +
        '      </button>' +
        '      <div v-html="post.content"></div>\n' +
        '    </div>'
});

// 使用v-model
Vue.component('custom-input', {
    // 将其 value attribute 绑定到一个名叫 value 的 prop 上
    // 在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
    props: ['value'],
    template: '<input v-bind:value="value" v-on:input="$emit(\'input\',$event.target.value)">\n'
});

Vue.component('alert-box', {
    props:['my_style'],
    template: `
    <div v-bind:style="my_style">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
// 创建Vue根实例，把这个组件作为自定义元素来使用，只有vue的实例内才可以使用自定义的组件
var vm = new Vue({
    el: '#app1',
    data: {
        // 实例范围内的组件可以使用实例中的数据，比如使用数组动态的创建组件的内容数量
        posts: [
            {id: 1, title: 'My journey with Vue1', time: '2020.8.10', content: '<p>this p</p>'},
            {id: 2, title: 'My journey with Vue2', time: '2020.8.11', content: '<p>this p</p>'},
            {id: 3, title: 'My journey with Vue3', time: '2020.8.12', content: '<p>this p</p>'}
        ],
        postFontSize: 1,
        searchText: 'test',
        demo_alert_box: {
            width: '780px',
            height: '50px',
            backgroundColor: '#f3beb8',
            border: '1px solid red',
            lineHeight:'50px'
        }
    },
    methods: {
        onEnlargeText: function (enlargeAmount) {
            this.postFontSize += enlargeAmount
        }
    }
});