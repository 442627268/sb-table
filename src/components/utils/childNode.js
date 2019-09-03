/**
 * Created by renlinfei on 2019-09-03.
 */
export default {
  methods:{
    getChild(val = 1) {
      let uid = this.component_uid + val;
      var children = this.$parent.$children[uid];
      return new Promise((resolve, reject) => {
        if (children && children.canEditCell) {
          return resolve(children);
        } else if (children && (uid < this.$parent.$children.length)) {
          return this.getChild(++val).then(res => resolve(res));
        } else {
          this.$emit("addRow", () => {
            this.$nextTick(() => {
              return this.getChild(++val).then(res => resolve(res));
            })
          });
        }
      });
    },
    childNode(){
      let uid=this.isColumn&&(this.component_uid+this.isColumn);
      if (this.isColumn&&uid<this.$parent.$children.length) {
        this.$parent.$children[uid].dbEdit(true);
      } else {
        this.getChild().then(res=>{
          res&&res.dbEdit(true);
        });
      }
    },
    getUid(){
      this.$parent.$children.some((value, index) => {
        if (value._uid == this._uid) {
          this.component_uid = index;
          return true;
        }
      });
    }
  }
}