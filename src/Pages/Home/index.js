import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button, Tooltip, Pagination } from "antd";
import SingleRequest from "../../app/components/Request/SingleRequest";
import {
  readRequest,
  addRequest,
} from "../../app/store/actions/requestActions";
import { BiMessageAltAdd } from "react-icons/bi";
import { AddRequest, Loading } from "../../app/components";
import SingleMatch from "../../app/components/Match/SingleMatch";
import { getMatches } from "../../app/store/actions/matchActions";

export const Home = ({
  user,
  quote,
  request,
  requestLoading,
  matches,
  thisPage,
  count,
  matchesLoading,
  readRequest,
  addRequest,
  getMatches,
}) => {
  React.useEffect(() => {
    readRequest({ appNo: user?.appNo });
    getMatches({ appNo: user?.appNo, page: parseInt(thisPage), limit: 4 });
  }, []);

  const getPage = (e) => {
    getMatches({ appNo: user?.appNo, page: e, limit: 4 });
  };

  const [addModal, setAddModal] = React.useState(false);

  const [requestData, setRequestData] = React.useState({
    appNo: user?.appNo,
    major: undefined,
    semester: undefined,
    tutNo: undefined,
    goTo: undefined,
    germanLevel: undefined,
    englishLevel: undefined,
  });

  let { appNo, major, semester, tutNo, goTo, germanLevel, englishLevel } =
    requestData;

  const onChange = (e) => {
    let { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const submitAdd = () => {
    let data = new FormData();
    data.append("appNo", appNo);
    data.append("major", major);
    data.append("semester", semester);
    data.append("tutNo", tutNo);
    goTo.forEach((tut) => {
      data.append("goTo", tut);
    });
    data.append("germanLevel", germanLevel);
    data.append("englishLevel", englishLevel);
    addRequest(data);
    getMatches({ appNo: user?.appNo, page: parseInt(thisPage), limit: 4 });
    setAddModal(false);
  };

  return (
    <div className="main-page">
      <AddRequest
        visible={addModal}
        onCancel={() => setAddModal(false)}
        onChange={onChange}
        onFinish={submitAdd}
      />
      <h1 className="text-center">Home</h1>
      <p className="text-center quote">{quote}</p>
      <Row>
        <div className="p-3 col-md-4">
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
                  <Button
                    className="sec-button"
                    onClick={() => setAddModal(true)}
                  >
                    <BiMessageAltAdd />
                  </Button>
                </Tooltip>
              )}
            </div>
            {!requestLoading && request && <SingleRequest request={request} />}
            {!requestLoading && !request && "No Requests"}
            {requestLoading && <div className="text-center"><Loading color="white"/></div>}
          </Card>
        </div>
        <div className="col-md-8 p-2 position-relative">
          <Row className="d-flex justify-content-center">
            <h2 className="text-center">Your Matches</h2>
          </Row>
          <div className="d-flex flex-wrap">
            {matches &&
              !matchesLoading &&
              matches.length > 0 &&
              matches.map((match, idx) => {
                return <SingleMatch key={idx} match={match} />;
              })}
          </div>
          {matchesLoading && <div className="text-center"><Loading color="var(--primaryColor)"/></div>}
          {!matchesLoading && matches?.length === 0 && <div className="text-center"><h3>No Matches found</h3></div>}
          <div className="text-center position-absolute bottom-0 start-50 translate-middle-x">
            <Pagination
              onChange={getPage}
              total={count}
              pageSize={4}
            />
          </div>
        </div>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  quote: state?.auth?.quote,
  request: state?.requests?.request,
  requestLoading: state?.requests?.isLoading,
  matches: state?.matches?.matches,
  matchesLoading: state?.matches?.isLoading,
  count: state?.matches?.count,
  thisPage: state?.matches?.thisPage,
});

const mapDispatchToProps = {
  readRequest,
  addRequest,
  getMatches,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
