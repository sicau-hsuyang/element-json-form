<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 13:33:27
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-19 14:07:57
-->
<script>
import FormControl from "@/components/controls/FormControl.vue";
import {
  validRuleOptions,
  defaultRule,
  triggerOptions,
  getControlEvents,
  asyncValidatorProvideTypes,
  requiredOptions
} from "@/config";
export default {
  name: "EventsControl",
  components: {
    FormControl
  },
  props: {
    activeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeCurrentEvent(index) {
      this.activeData.events.splice(index, 1);
    },
    addEvent() {
      this.activeData.events.push({
        type: "",
        handler: ""
      });
    },
    getItems(h) {
      return this.activeData.events.map((eventItem, i) => {
        return (
          <div key={eventItem.type} class="event-item">
            <span
              class="close-btn"
              on-click={() => {
                this.removeCurrentEvent(i);
              }}
            >
              <i class="el-icon-close" />
            </span>
            <el-form-item label="事件类型">
              <form-control
                v-model={eventItem.type}
                type="select"
                options={getControlEvents(this.activeData.tag)}
              ></form-control>
            </el-form-item>
            <el-form-item label="处理器">
              <form-control
                v-model={eventItem.handler}
                type="textarea"
              ></form-control>
            </el-form-item>
          </div>
        );
      });
    }
  },
  render(h) {
    return (
      <div>
        <el-divider>事件</el-divider>
        {this.getItems(h)}
        <div style="margin-left: 20px">
          <el-button
            icon="el-icon-circle-plus-outline"
            type="text"
            on-click={() => {
              this.addEvent();
            }}
          >
            添加事件
          </el-button>
        </div>
      </div>
    );
  }
};
</script>
