<template>
    <div class="l-contail">
        <div class="l-header">
            <top ref="top" />
        </div>
        <div class="l-main">
            <keep-alive>
                <router-view class="lr-view"
                            v-if="$route.meta.keepAlive && isRouterAlive"  />
            </keep-alive>
            <router-view class="lr-view"
                        v-if="!$route.meta.keepAlive && isRouterAlive" />
        </div>
    </div>
</template>
<script>
import top from "./top/";
export default {
    name: "index",
    provide () {
        return {
        index: this
        };
    },
    components: {
        top
    },
    data () {
        return {
            isRouterAlive:true
        }
    },
    async created () {
        await this.loadData();
    },
    mounted () {
        this.init();
    },
    methods: {
        async loadData(){
            // 加载登录者信息
            await this.$store.dispatch('GetUserInfo');
            this.loading = false;
        },
        init () {
            this.$store.commit("SET_SCREEN", document.body.clientWidth);
            window.onresize = () => {
            setTimeout(() => {
                this.$store.commit("SET_SCREEN", document.body.clientWidth);
            }, 0);
            };
        },
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(()=>{
                this.isRouterAlive = true;
            })
        }
    }
}
</script>
<style lang="scss">
    .l-header,.l-main  {
        transition: all .3s;
    }
    .l-contail {
        position: relative;
        width: 100%;
        height: 100%;
        background: #f0f2f5;
        background-size: 100%;
        background-repeat: no-repeat;
    }
    .l-header {
        position: fixed;
        z-index: 1026;
        width: 100%;
        background-color: #001529;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        box-sizing: border-box;
    }

    .l-main {
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 56px;
        padding: 0;
        width: 100%;
        height: calc(100% - 56px);
        overflow: hidden;
        background: #f0f2f5;
    }
</style>