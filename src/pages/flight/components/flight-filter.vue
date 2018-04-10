<template lang="jade">
  view.mask(hidden="{{showFilter!=1}}")
    view#filter-wapper
      view.head
        .button.button-cancel(@tap="clearFilter") 清空
        .button.button-confirm(@tap="confirmFilter") 确定
      view.content
        ul.group-list
          repeat(for="{{filterOptions}}" index="groupKey" item='group')
            li.item(
              @tap="selectGroup({{groupKey}})",
              class="{{groupKey==activeGroupKey?'active':''}}"
            ) {{group.groupName}}
        .options-list.timer(wx:if="{{activeGroupKey === 'time'}}")
          ul.time-section
            repeat(for="{{filterOptions.time.options}}" item='option')
              li.item(
                @tap="setFilter('time', {{option}}, {{filterOptions.time.multiple}})",
                class="{{filterStack.time==option.value ? 'active' : ''}}"
              )
                span {{option.text}}
        .options-list.airport(wx:elif="{{activeGroupKey === 'airport'}}")
          view(for="{{airportGroup}}" item='group')
            dt.airport-group-name {{group.name}}
            dd.airport-list
              .item(
                for="{{group.list}}" item='option',
                @tap="setFilter({{group.key}}, {{option}}, {{filterOptions.airport.multiple}})",
                class="{{filterStack[group.key].indexOf(option.value) !== -1?'active':''}}"
              ) {{option.text}}
        ul.options-list.other(wx:else)
          repeat(for="{{filterOptions[activeGroupKey].options}}" item='option')
            li.item(
              @tap="setFilter({{activeGroupKey}}, {{option}}, {{filterOptions[activeGroupKey].multiple}})",
              class="{{filterStack[activeGroupKey].indexOf(option.value) !== -1?'active':''}}"
            ) {{option.text}}

</template>

<script>
import wepy from 'wepy';

export default class Panel extends wepy.component {
  props = {
    showFilter: [Number, String]
  };
  data = {
    activeGroupKey: null,
    filterStack: null,
    current: {},
    airportGroup: [],
    startX: '',
    endX: '',
    step: '',
    intervalStart: 0,
    intervalEnd: 24,
    startStep: 0,
    endStep: 24,
    amountW: '',
    filterOptions: {
      time: {
        groupName: '起飞时段',
        multiple: true,
        options: [{
          text: '不限',
          value: 0,
          start: 0,
          end: 24
        }, {
          text: '上午',
          start: 0,
          end: 12,
          value: 1
        }, {
          text: '下午',
          start: 12,
          end: 18,
          value: 2
        }, {
          text: '晚上',
          start: 18,
          end: 24,
          value: 3
        }]
      },
      transship: {
        groupName: '直飞\\经停',
        options: [{
          text: '不限',
          value: 0
        }, {
          text: '仅直飞',
          value: 1
        }, {
          text: '经停',
          value: 2
        }]
      },
      cabin: {
        groupName: '舱位',
        options: [{
          value: 0,
          text: '不限'
        }, {
          value: 1,
          text: '经济舱'
        }, {
          value: 2,
          text: '头等/公务舱'
        }]
      },
      airline: {
        groupName: '航空公司',
        multiple: true,
        options: [{
          text: '不限',
          value: 0
        }, {
          text: '海航',
          value: 'HU'
        }, {
          text: '吉祥',
          value: 'HO'
        }, {
          text: '上航',
          value: 'FM'
        }, {
          text: '国航',
          value: 'CA'
        }, {
          text: '东航',
          value: 'MU'
        }, {
          text: '联航',
          value: 'KN'
        }, {
          text: '厦门航空',
          value: 'MF'
        }]
      },
      airport: {
        groupName: '起降机场'
      }
    }
  };
  onLoad() {
    const vm = this;
    let curFilter = this.current;
    let filterOptions = this.filterOptions;
    let stack = {};

    Object.keys(filterOptions).forEach(function(groupKey) {
      if (groupKey === 'airport') {
        ['departAirport', 'arriveAirport'].forEach(key => {
          let curOption = curFilter[key];
          stack[key] = curOption ? (curOption instanceof Array ? curOption.slice() : [curOption]) : [0];
        });
      } else {
        let curOption = curFilter[groupKey];
        stack[groupKey] = curOption ? (curOption instanceof Array ? curOption.slice() : [curOption]) : [filterOptions[groupKey].options[0].value];
      }
      if (groupKey === 'time') {
        if (isNaN(stack.time[0])) {
          stack.time[0] = 0;
        }
      }
    });
    vm.filterStack = stack;
    console.log(vm.filterStack);
  }
  methods = {
    setFilter(activeGroupKey, option, multiple) {
      console.log(activeGroupKey, option, multiple);
      let value = option.value;
      let curGroupStack = this.filterStack[activeGroupKey].slice();
      let curIndex = curGroupStack.indexOf(value);

      if (activeGroupKey === 'time') {
        this.startStep = option.start;
        this.endStep = option.end;
        curGroupStack = [];
        curGroupStack.push(value);
      } else {
        if (!multiple || value === 0 || curGroupStack.indexOf(0) !== -1) {
          curGroupStack = [value];
        } else {
          if (curIndex === -1) {
            curGroupStack.push(value);
          } else {
            curGroupStack.splice(curIndex, 1);
          }

          if (curGroupStack.length === this.filterOptions[activeGroupKey].options.length - 1) {
            curGroupStack = [0];
          }
        }
      }
      this.filterStack[activeGroupKey] = curGroupStack;
      console.log(this.filterStack);
    },
    selectGroup(groupKey) {
      this.activeGroupKey = groupKey;
      console.log(groupKey);
    },
    clearFilter() {
      this.$emit('clear');
    },
    confirmFilter() {
      this.$emit('confirm');
    }
  };
}
</script>

<style lang="styl" src="./flight-filter.styl"></style>