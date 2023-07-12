<template>
  <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="showModal('add','')">Add</a-button>
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <a-form
        ref="formRef"
        :model="formState"
        v-bind="layout"
        name="nest-messages"
        :validate-messages="validateMessages"
        @finish="onFinish"
    >
      <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.name"/>
      </a-form-item>
      <a-form-item :name="['user', 'age']" label="Age" :rules="[{ type: 'number', min: 0, max: 99 }]">
        <a-input-number v-model:value="formState.user.age"/>
      </a-form-item>
      <a-form-item :name="['user', 'address']" label="Address">
        <a-input v-model:value="formState.user.address"/>
      </a-form-item>

    </a-form>
  </a-modal>
  <a-table bordered :data-source="dataSource" :columns="columns" :loading="loading">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)"/>
            <check-outlined class="editable-cell-icon-check" @click="save(record.key)"/>
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.key)"/>
          </div>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <a @click="showModal('Edit',record)">Edit</a>
        <a-divider type="vertical"/>
        <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
        >
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from 'vue';
import {CheckOutlined, EditOutlined} from '@ant-design/icons-vue';
import {cloneDeep} from 'lodash-es';
import type {FormInstance} from 'ant-design-vue';

const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '30%',
}, {
  title: 'age',
  dataIndex: 'age',
}, {
  title: 'address',
  dataIndex: 'address',
}, {
  title: 'operation',
  dataIndex: 'operation',
}];

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: i + 1,
    address: `London Park no. ${i}`,
  });
}
const dataSource = ref(data);
const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const onDelete = key => {
  loading.value = true;
  setTimeout(() => {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
    loading.value = false;
  }, 1000);
};
const visible = ref<boolean>(false);
const formRef = ref<FormInstance>();
const actionType = ref<string>('');
const loading = ref<boolean>(false);
const showModal = (type, record) => {
  actionType.value = type;
  visible.value = true;
  if (type === 'add') {
    formState.user = {
      key: '0',
      name: '',
      age: 0,
      address: '',
    }
  } else {
    formState.user = {
      key: record.key,
      name: record.name,
      age: record.age,
      address: record.address,
    }
  }
};
const handleOk = () => {
  if (actionType.value === 'add') {
    loading.value = true;
    setTimeout(() => {
      const newData = {
        key: `${count.value}`,
        name: formState.user.name,
        age: formState.user.age,
        address: formState.user.address,
      };
      dataSource.value.push(newData);
      loading.value = false;
    }, 1000);
  } else {
    loading.value = true;
    setTimeout(() => {
      dataSource.value.forEach((item, index) => {
        if (item.key.indexOf(formState.user.key) > -1) {
          dataSource.value.splice(index, 1, formState.user);
        }
      })
      loading.value = false;
    }, 1000);
  }
  visible.value = false;
};
/*表单*/
const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 22},
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = reactive({
  user: {
    key: '0',
    name: '',
    age: 0,
    address: '',
  },
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
</script>
<style lang="less">
.editable-cell {
  position: relative;

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>
