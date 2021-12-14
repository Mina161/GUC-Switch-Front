import React from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Modal } from "antd";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  deleteRequest,
  updateRequest,
} from "../../store/actions/requestActions";
import { EditRequest } from "./RequestComponents";

export const DeleteModal = ({ visible, onOk, onCancel }) => {
  return (
    <Modal
      title="Confirm"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ className: "main-button" }}
      cancelButtonProps={{ className: "main-button-cancel" }}
    >
      <h2>Are you sure you want to delete your request?</h2>
    </Modal>
  );
};

export const SingleRequest = ({ request, deleteRequest, updateRequest }) => {
  const [modals, setModals] = React.useState({ delete: false, edit: false });

  const onDeleteOk = () => {
    deleteRequest({ appNo: request?.appNo });
  };

  const onCancel = () => {
    setModals({ edit: false, delete: false });
  };

  const [requestData, setRequestData] = React.useState({
    appNo: request?.appNo,
    major: request?.major,
    semester: request?.semester,
    tutNo: request?.tutNo,
    goTo: request?.goTo.split(","),
    germanLevel: request?.germanLevel,
    englishLevel: request?.englishLevel,
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  let { appNo, major, semester, tutNo, goTo, germanLevel, englishLevel } =
    requestData;
  
  const editAdd = () => {
    let data = new FormData();
    data.append("appNo", appNo);
    data.append("major", major);
    data.append("semester", semester);
    data.append("tutNo", tutNo);
    data.append("goTo", goTo);
    data.append("germanLevel", germanLevel);
    data.append("englishLevel", englishLevel);
    updateRequest(data);
    onCancel();
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => setModals({ ...modals, edit: true })}
        icon={<AiOutlineEdit />}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        onClick={() => setModals({ ...modals, delete: true })}
        icon={<AiOutlineDelete color="red" />}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="request p-2">
      <DeleteModal
        visible={modals.delete}
        onOk={onDeleteOk}
        onCancel={onCancel}
      />
      <EditRequest
        visible={modals.edit}
        onFinish={editAdd}
        onCancel={onCancel}
        data={requestData}
        onChange={onChange}
      />
      <div className="d-flex justify-content-between">
        <h4>Switching Request of {request?.appNo}</h4>
        <Dropdown overlay={menu} trigger={["click"]}>
          <BiDotsVerticalRounded size={25} />
        </Dropdown>
      </div>
      <div>
        <p>Major: {request?.major}</p>
        <p>Semester: {request?.semester}</p>
        <p>Tutorial Number: {request?.tutNo}</p>
        <p>Wants to go to: {request?.goTo.toString()}</p>
        <p>German: {request?.germanLevel}</p>
        <p>English: {request?.englishLevel}</p>
      </div>
      <p></p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { deleteRequest, updateRequest };

export default connect(mapStateToProps, mapDispatchToProps)(SingleRequest);
