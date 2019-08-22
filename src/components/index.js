/**
 * Created by renlinfei on 2019-08-22.
 */
import columnDate from './column-date'
import columnInput from './column-input'
import columnTable from './column-table'
import columnSelect from './column-select'
columnDate.install = (Vue) => {
  Vue.component(columnDate.name, columnDate)
}
columnInput.install = (Vue) => {
  Vue.component(columnInput.name, columnInput)
}
columnTable.install = (Vue) => {
  Vue.component(columnTable.name, columnTable)
}
columnSelect.install = (Vue) => {
  Vue.component(columnSelect.name, columnSelect)
}
export default {
  columnDate,
  columnInput,
  columnTable,
  columnSelect
}
