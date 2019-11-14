/**
 * Created by renlinfei on 2019-09-03.
 */
export default {
  methods: {
    // 搜索(前端下拉搜索)
    localfilterMethod(query) {
      const regExp = new RegExp(query, 'i');
      if(!query){
        this.copyselectData=JSON.parse(JSON.stringify(this.selectData));
        return;
      }
      this.copyselectData = this.selectData.filter(value => {
        return regExp.test(value.code) || regExp.test(value.tname) || regExp.test(value.nameShort);
      });
    },
  }
}
