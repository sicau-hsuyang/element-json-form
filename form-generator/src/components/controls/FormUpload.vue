<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 13:25:05
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-18 13:29:01
-->
<script>
export default {
  name: "FormUpload",
  render(h) {
    return (
      <el-upload
        {...{
          props: {
            ...this.$attrs
          },
          attrs: {
            ...this.$attrs
          },
          on: {
            ...this.$listeners
          }
        }}
      >
        {this.listType(h, this.$attrs)}
      </el-upload>
    );
  },
  methods: {
    listType: (h, conf) => {
      const list = [];
      const config = conf;
      if (conf["list-type"] === "picture-card") {
        list.push(<i class="el-icon-plus"></i>);
      } else {
        list.push(
          <el-button size="small" type="primary" icon="el-icon-upload">
            {config.buttonText}
          </el-button>
        );
      }
      if (config.showTip) {
        list.push(
          <div slot="tip" class="el-upload__tip">
            只能上传不超过 {config.fileSize}
            {config.sizeUnit} 的{conf.accept}文件
          </div>
        );
      }
      return list;
    }
  }
};
</script>
