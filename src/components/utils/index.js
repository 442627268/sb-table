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
        this.childNode();
      }
      if (this.$listeners.editCell) {
        this.$emit('editCell', e);
        return
      }
      this.currentValue = e;
      this.$emit("input", this.currentValue)
    },

  }
}
