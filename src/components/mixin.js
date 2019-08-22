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
        const uid = this._uid;
        let childuid = [];
        console.log(this)
        if (this.isColumn) {
          childuid = this.$parent.$children.filter(value => value._uid == (uid + parseInt(this.isColumn)));
        } else {
          childuid = this.$parent.$children.filter(value => value._uid == (uid + 1));
          if (!childuid[0].dbEdit) {
            childuid = this.$parent.$children.filter(value => value._uid == (uid + 2));
          }
        }
        childuid.length && childuid[0].dbEdit(true)
      }
      if (this.$listeners.editCell) {
        this.$emit('editCell', e);
        return
      }
      this.currentValue = e;
      this.$emit("input", this.currentValue)
    }
  }
}