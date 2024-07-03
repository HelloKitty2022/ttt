//import { reduceRight } from "core-js/fn/array";
/**
 * 作为后续扩展
 */
const RouterPlugin = function () {
    this.$router = null;
    this.$store = null;
};
RouterPlugin.install = function (vue, option = {}) {
    this.$router = option.router;
    this.$store = option.store;
    function isURL (s) {
        if (s.includes('html')) return true;
        return /^http[s]?:\/\/.*/.test(s)
    }
    function objToform (obj) {
        let result = [];
        Object.keys(obj).forEach(ele => {
        result.push(`${ele}=${obj[ele]}`);
        })
        return result.join('&');
    }
    this.$router.$lRouter = {
        //全局配置
        routerList: [],
        group: '',
        meta: {},
        safe: this,
        // 设置标题
        setTitle: (title) => {
            const defaultTitle = this.$store.getters.website.title;
            title = title ? `${title}——${defaultTitle}` : defaultTitle;
            document.title = title;
        },
        generateTitle: (title) => {
            return title;
        },
        //处理路由
        getPath: function (params = {}, meta = {}) {
            let { src } = params;
            let result = src || '/';
            /*if (isURL(src)) {
                result = `/myiframe/urlPath?${objToform(Object.assign(meta, params))}`;
            }*/
            return result;
        },
        //正则处理路由
        vaildPath: function (list, path) {
            let result = false;
            list.forEach(ele => {
                if (new RegExp("^" + ele + ".*", "g").test(path)) {
                result = true
                }

            })
            return result;
        },
        //设置路由值
        getValue: function (route) {
            let value = "";
            if (route.query.src) {
                value = route.query.src;
            } else {
                value = route.path;
            }
            return value;
        },
        //动态路由
        formatRoutes: function () {
            // 暂未实现
        }
    }
}
export default RouterPlugin;