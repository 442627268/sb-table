/**
 * Created by renlinfei on 2019-08-13.
 */
export default {
  data() {
    return {
      isEdit: false,
      currentValue: this.value
    }
  },
  props: {
    isColumn: {
      type: [String, Boolean, Number]
    },
  },
  methods: {
    handleInput(e, flag) {
      if (flag) {
        this.isEdit = false;
        let childuid = [];
        if (this.isColumn) {
            childuid = this.getChild(parseInt(this.isColumn))
        } else {
          childuid = this.getChild()
        }
        childuid.length && childuid[0].dbEdit(true)
      }
      if (this.$listeners.editCell) {
        this.$emit('editCell', e);
        return
      }
      this.currentValue = e;
      this.$emit("input", this.currentValue)
    },
      getChild(val=1){
          const uid = this._uid;
          let childuid = this.$parent.$children.filter(value => value._uid == (uid + val));
          if (!childuid.length) {
              childuid = this.$parent.$children.filter(value => value._uid == (uid + val+1));
          }
          if(!childuid[0].canEditCell){//编辑
              return this.getChild(++val);
          }else{
              return childuid;
          }
      },
  }
}
