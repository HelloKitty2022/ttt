/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Vue from 'vue'

import Common from './common/';
import Bar from './bar/';
import Line from './line/';
import Pie from './pie/';
import Pictorialbar from './pictorialbar/';
import Radar from './radar/';
import Scatter from './scatter/';
import Funnel from './funnel/';
import lMap from './map/';

import Text from './text/';
import Datetime from './datetime/';

import Img from './img/';
import Imgborder from './imgborder/';
import Swiper from './swiper/';
import Iframe from './iframe/';
import Video from './video/';

import Flop from './flop/';
import Progress from './progress/';
import Gauge from './gauge/';
import Wordcloud from './wordcloud/';

import Table from './table/';
import Tabs from './tabs/';



/**自定义组件 */
import Test from './test/';


const list = [
  Test,
  Common,
  Bar,
  Line,
  Pie,
  Pictorialbar,
  Radar,
  Scatter,
  Funnel,
  lMap,

  Text,
  Datetime,

  Img,
  Imgborder,
  Swiper,
  Iframe,
  Video,

  Flop,
  Progress,
  Gauge,
  Wordcloud,

  Table,
  Tabs
]
//循环注册组件
list.forEach(ele => {
  Vue.component(`l-echart-${ele.name}`, ele)
})