import { Modal, Form, Input, Button, Select } from "antd";
const moment = require('moment')
var semesters = [];
var curMonth = moment().month() + 1;
export const AddRequest = ({ visible, onCancel, onChange, onFinish }) => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  if(curMonth > 8 && curMonth < 11){
    semesters = [1,3,5,7,9,11]
  } else {
    semesters = [2,4,6,8,10,12]
  }

  return (
    <Modal
      visible={visible}
      title="Create Request"
      footer={null}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <Form
        name="addRequest"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Major"
          name="major"
          rules={[{ required: true, message: "Please select your major" }]}
        >
          <Select
            name="major"
            onSelect={(e) => onChange({ target: { name: "major", value: e } })}
          >
            <Select.Option value="MET">MET</Select.Option>
            <Select.Option value="DMET">DMET</Select.Option>
            <Select.Option value="IET">IET</Select.Option>
            <Select.Option value="EMS">EMS</Select.Option>
            <Select.Option value="EDPT">EDPT</Select.Option>
            <Select.Option value="Architecture">Architecture</Select.Option>
            <Select.Option value="Civil">Civil</Select.Option>
            <Select.Option value="BI">BI</Select.Option>
            <Select.Option value="Management">Management</Select.Option>
            <Select.Option value="Pharmacy">Pharmacy</Select.Option>
            <Select.Option value="Law">Law</Select.Option>
            <Select.Option value="Applied Arts">Applied Arts</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semester"
          help="Next semester number"
          rules={[{ required: true, message: "Please select your semester" }]}
        >
          <Select
            name="semester"
            onSelect={(e) =>
              onChange({ target: { name: "semester", value: e } })
            }
          >
           {
             semesters.map(val => { return(<Select.Option value={val}>{val}</Select.Option>)})
           }
          </Select>
        </Form.Item>
        <Form.Item
          label="Tutorial Number"
          name="tutNo"
          rules={[
            {
              required: true,
              message: "Please enter your current tutorial number",
            },
          ]}
        >
          <Input onChange={onChange} type="number" name="tutNo" />
        </Form.Item>
        <Form.Item
          label="Target Tutorials"
          name="goTo"
          help="Press Enter/Return after each number"
          rules={[
            {
              required: true,
              message: "Please enter your desired tutorial numbers",
            },
          ]}
        >
          <Select
            name="goTo"
            mode="tags"
            placeholder="Numbers only"
            onChange={(e) => onChange({ target: { name: "goTo", value: e } })}
          />
        </Form.Item>
        <Form.Item
          label="German Level"
          name="germanLevel"
          rules={[
            { required: true, message: "Please select your german level" },
          ]}
        >
          <Select
            name="germanLevel"
            onSelect={(e) =>
              onChange({ target: { name: "germanLevel", value: e } })
            }
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="done">Completed</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="English Level"
          name="englishLevel"
          rules={[
            { required: true, message: "Please select your english level" },
          ]}
        >
          <Select
            name="englishLevel"
            onSelect={(e) =>
              onChange({ target: { name: "englishLevel", value: e } })
            }
          >
            <Select.Option value="AE">AE</Select.Option>
            <Select.Option value="AS">AS</Select.Option>
            <Select.Option value="SM">SM</Select.Option>
            <Select.Option value="CPS">CPS</Select.Option>
            <Select.Option value="RPW">RPW</Select.Option>
            <Select.Option value="done">Completed</Select.Option>
          </Select>
        </Form.Item>
        <div className="text-center">
          <Button className="main-button" type="primary" htmlType="submit">
            Add Request
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export const EditRequest = ({
  visible,
  onCancel,
  onChange,
  onFinish,
  data,
}) => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      visible={visible}
      title="Edit Request"
      footer={null}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <Form
        name="editRequest"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        initialValues={{
          major: data.major,
          semester: data.semester,
          tutNo: data.tutNo,
          goTo: data.goTo,
          germanLevel: data.germanLevel,
          englishLevel: data.englishLevel
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Major"
          name="major"
          rules={[{ required: true, message: "Please select your major" }]}
        >
          <Select
            name="major"
            onSelect={(e) => onChange({ target: { name: "major", value: e } })}
          >
            <Select.Option value="MET">MET</Select.Option>
            <Select.Option value="DMET">DMET</Select.Option>
            <Select.Option value="IET">IET</Select.Option>
            <Select.Option value="EMS">EMS</Select.Option>
            <Select.Option value="EDPT">EDPT</Select.Option>
            <Select.Option value="Architecture">Architecture</Select.Option>
            <Select.Option value="Civil">Civil</Select.Option>
            <Select.Option value="BI">BI</Select.Option>
            <Select.Option value="Management">Management</Select.Option>
            <Select.Option value="Pharmacy">Pharmacy</Select.Option>
            <Select.Option value="Law">Law</Select.Option>
            <Select.Option value="Applied Arts">Applied Arts</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semester"
          help="Next semester number"
          rules={[{ required: true, message: "Please select your semester" }]}
        >
          <Select
            name="semester"
            onSelect={(e) =>
              onChange({ target: { name: "semester", value: e } })
            }
          >
            {
             semesters.map(val => { return(<Select.Option value={val}>{val}</Select.Option>)})
           }
          </Select>
        </Form.Item>
        <Form.Item
          label="Tutorial Number"
          name="tutNo"
          rules={[
            {
              required: true,
              message: "Please enter your current tutorial number",
            },
          ]}
        >
          <Input onChange={onChange} type="number" name="tutNo" />
        </Form.Item>
        <Form.Item
          label="Target Tutorials"
          name="goTo"
          help="Press Enter/Return after each number"
          rules={[
            {
              required: true,
              message: "Please enter your desired tutorial numbers",
            },
          ]}
        >
          <Select
            name="goTo"
            mode="tags"
            placeholder="Numbers only"
            onChange={(e) => onChange({ target: { name: "goTo", value: e } })}
          />
        </Form.Item>
        <Form.Item
          label="German Level"
          name="germanLevel"
          rules={[
            { required: true, message: "Please select your german level" },
          ]}
        >
          <Select
            name="germanLevel"
            onSelect={(e) =>
              onChange({ target: { name: "germanLevel", value: e } })
            }
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="done">Completed</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="English Level"
          name="englishLevel"
          rules={[
            { required: true, message: "Please select your english level" },
          ]}
        >
          <Select
            name="englishLevel"
            onSelect={(e) =>
              onChange({ target: { name: "englishLevel", value: e } })
            }
          >
            <Select.Option value="AE">AE</Select.Option>
            <Select.Option value="AS">AS</Select.Option>
            <Select.Option value="SM">SM</Select.Option>
            <Select.Option value="CPS">CPS</Select.Option>
            <Select.Option value="RPW">RPW</Select.Option>
            <Select.Option value="done">Completed</Select.Option>
          </Select>
        </Form.Item>
        <div className="text-center">
          <Button className="main-button" type="primary" htmlType="submit">
            Edit Request
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
