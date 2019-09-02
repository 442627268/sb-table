/** time
 *author:
 *function:
 */

import Vue from 'vue'

export default () => {
    Vue.directive('load-more', {
        bind(el, binding) {
            const selectWrap = el.querySelector('.el-table__body-wrapper');
            selectWrap.addEventListener('scroll',function() {
                if (this.scrollTop + this.clientHeight + 50 >= this.scrollHeight) {
                    binding.value();
                }
            })

        }
    })
}

