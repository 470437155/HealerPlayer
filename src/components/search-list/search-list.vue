<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li class="search-item" v-for="item in searches" @click="selectItem(item)">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
	export default {
		props:{
		  searches:{
		    type:Array,
        default:[]
      }
    },
    methods:{
      selectItem(item){
        this.$emit('select',item)
      },
      deleteOne(item){
        this.$emit('delete',item)
      }
    }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-list
    .search-item
      display:flex
      align-items: center
      height: 40px
      overflow:hidden
      .text
        flex: 1
        font-size:$font-size-small
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size:$font-size-small
          color: $color-text-d
</style>
