<!--
 * @Author: JohnYang
 * @Date: 2020-10-18 13:33:27
 * @LastEditors: JohnYang
 * @LastEditTime: 2020-10-20 22:56:53
-->
<script>
import FormControl from "@/components/controls/FormControl.vue";
import {
  validRuleOptions,
  defaultRule,
  triggerOptions,
  getControlEvents,
  asyncValidatorProvideTypes,
  requiredOptions,
  formControlEventHandlerFragment
} from "@/config";
export default {
  name: "EventsControl",
  inject: ["panel"],
  components: {
    FormControl
  },
  props: {
    activeData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentItem: null
    };
  },
  computed: {
    allEvents() {
      return getControlEvents(this.activeData.tag);
    }
  },
  methods: {
    subscribeEvent() {
      this.$on("monaco-change", content => {
        this.currentItem.handler = content;
      });
    },
    handleFocus(item) {
      this.currentItem = item;
      if (this.panel) {
        this.panel.openMonacoDialog(
          item.handler ? item.handler : formControlEventHandlerFragment
        );
        this.panel.setAsCurrentUser(this);
      }
      this.subscribeEvent();
    },
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
          <div key={eventItem.type + i} class="event-item">
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
                options={this.allEvents}
              ></form-control>
            </el-form-item>
            <el-form-item label="处理器">
              <form-control
                v-model={eventItem.handler}
                on-focus={() => {
                  this.handleFocus(eventItem);
                }}
                placeholder="请输入事件处理器"
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
