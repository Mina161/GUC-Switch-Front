import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button, Tooltip } from "antd";
import SingleRequest from "../../app/components/Request/SingleRequest";
import { readRequest, addRequest } from "../../app/store/actions/requestActions";
import { BiMessageAltAdd } from "react-icons/bi";
import { AddRequest } from "../../app/components";

export const Home = ({
  user,
  quote,
  request,
  requestLoading,
  matches,
  readRequest,
  addRequest
}) => {
  React.useEffect(() => {
    readRequest({ appNo: user.appNo });
  }, []);

  const [addModal, setAddModal] = React.useState(false)

  const [requestData, setRequestData] = React.useState(
    {
      appNo: user.appNo,
      major: undefined,
      semester: undefined,
      tutNo: undefined,
      goTo: undefined,
      germanLevel: undefined,
      englishLevel: undefined
    }
  )

  let {appNo, major, semester, tutNo, goTo, germanLevel, englishLevel} = requestData

  const onChange = (e) => {
    let {name, value} = e.target;
    setRequestData({...requestData, [name]: value})
  }

  const submitAdd = () => {
    let data = new FormData()
    data.append("appNo", appNo)
    data.append("major", major)
    data.append("semester", semester)
    data.append("tutNo", tutNo)
    goTo.forEach((tut) => {
      data.append("goTo", tut);
    });
    data.append("germanLevel", germanLevel)
    data.append("englishLevel", englishLevel)
    addRequest(data)
    setAddModal(false)
  }

  return (
    <div className="main-page">
      <AddRequest visible={addModal} onCancel={() => setAddModal(false)} onChange={onChange} onFinish={submitAdd}/>
      <h1 className="text-center">Home</h1>
      <p className="text-center quote">{quote}</p>
      <Row>
        <Col className="p-3" md={10}>
          <Card className="info-card">
            <h3>Hello {user.name}</h3>
            <p>GUC ID: {user.appNo}</p>
            <p>Phone: {user.phoneNo}</p>
            <p>Email: {user.email}</p>
          </Card>
          <Card className="info-card">
            <div className="d-flex justify-content-between">
              <h3>Your request</h3>
              {!requestLoading && !request && (
                <Tooltip title="Add request">
                  <Button className="sec-button" onClick={() => setAddModal(true)}>
                    <BiMessageAltAdd />
                  </Button>
                </Tooltip>
              )}
            </div>
            {!requestLoading && request && <SingleRequest request={request} />}
            {!requestLoading && !request && "No Requests"}
          </Card>
        </Col>
        <Col md={14}></Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  quote: state?.auth?.quote,
  request: state?.requests?.request,
  requestLoading: state?.requests?.isLoading,
});

const mapDispatchToProps = {
  readRequest,
  addRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
