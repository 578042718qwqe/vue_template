
<template>
  <div>
    <!-- <div v-model="m1">aaaaaaaaaa1</div> -->
    <div id="dda">{{m1}}</div>
    <div v-once>{{m1}}</div>
    <div id="ddc">{{m1}}</div>
    <input type="text" v-model="m1.a"/>  
    <button @click="change()">change</button>
    <div :class="{red:m1.isRed}">aaaa</div>
    <button @click="change2()" :disabled="m1.isDisabled">change2</button>
    <button @click="change3()" :disabled="m1.isDisabled">change3</button>

    <span v-for="(val, key) in m1.arr1" :key="key"  > {{val}}-{{key}}   &nbsp;-- </span> 
    <div>computed:{{func1}}</div>
    <div>watch:{{m1.d}}</div>
    <input type="text" v-model.number="m1.inp1" v-focus/>
    <div v-if="m1.vis > 0.5">random() &gt; 0.5,you can see</div>  
    <div v-else>random()&lt;0.5</div>  
    <!-- <router-link :to="{name:'a',params:{id:123}}">link1</router-link> -->
    <router-link to="/login13">link2</router-link>
    <router-view class="view1" name="a" ></router-view>
    <!-- <button @click="aniFunc1()">ani1</button><button @click="aniFunc2()">ani2</button> -->
    <!-- <div id="demo">
        <button v-on:click="show = !ddd">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div> -->

  </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import VueRoute from 'vue-router'
import Vuex from 'vuex'

Vue.use(Vuex)
// setTimeout(f=>{
//     var vm = new Vue({
//         el : '#ddc',
//         data() {
//             return {m2 : {
//                 a:32
//             }}
//         },
//     })
// },1000)

Vue.directive('focus',{
    inserted : function(el) {
        el.focus()
    }
})


const store = new Vuex.Store({
  state1: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state1 => {
      return state1.todos.filter(todo => todo.done)
    }
  }
})


const router1 = new VueRoute({
    routes: [
        {
            name:'a',
            path: '/login12',
            components:{
                a:{template:'<div>aaaaaaaas</div>'}
            }
        }
    ]
})

var obj = {
        m1 : {
            a:11,
            b:2,
            c:0,
            d:0,
            inp1:'',
            vis : 0,
            isRed : true,
            isDisabled : false,
            state : {'xx':'xx'},
            arr1 : [{a:1,b:2},{a:1,b:25},{a:11,b:12},{a:21,b:22}]
        }
    }

// Object.freeze(obj)

setInterval(f => {
    obj.m1.a ++
    obj.m1.vis = Math.random()
    // console.log(obj.m1.a)
},2000)
export default {
//   el : '#dda',
  name : 'login1',
  data(){
    return obj
  },
  mixins:[{
      methods : {
        // change2 : function() {
        //     console.log('change2 mixin')
        // }
        change2() {
            console.log(222222222)
        }
      }
      
  }],
  methods : {
      change() {
        //   console.log(1)
        obj.m1.a = 0
      },
      change2() {
        // obj.m1.arr1.splice(1,1)
        obj.m1.arr1[0].b++
        var store1 = this.$store
        console.log(store1)
        if(!store1.state.st1) {
            store1.state.st1 = {a:0}
        }
        obj.m1.state = store1.state.st1
        console.log(store1.state)
        store1.dispatch('addErrorLog')
        // 


      },
      change3() {
        this.$store.state.st1.a++
      },
      aniFunc1() {
        
      },
      aniFunc2() {

      }
  },
  computed: {
      func1 :function() {
        //   console.log('func1')
          this.m1.c = this.m1.a + this.m1.b
          return this.m1.c
      }
  },
  watch : {
      func1 : function() {
        //   console.log('watch1')
          this.m1.d = this.m1.a + this.m1.b + 1
          return this.m1.d
      },
      'm1.inp1' : _.debounce(function() {
          console.log(this.m1.inp1)
      },500) 
  },
  

}
</script>

<style lang="scss" scoped>
.red {
    color:red
}
</style>






























