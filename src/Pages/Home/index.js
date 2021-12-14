import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Button, Tooltip } from "antd";
import SingleRequest from "../../app/components/Request/SingleRequest";
import { readRequest, addRequest } from "../../app/store/actions/requestActions";
import { BiMessageAltAdd } from "react-icons/bi";
import { AddRequest } from "../../app/components";

export const Home = ({
  user,
  request,
  requestLoading,
  matches,
  readRequest,
  addRequest
}) => {
  const quotes = [
    "You can always look up to others for inspiration but never for comparison. ~Angel Graff, Self Esteem",
    "The only real mistake is the one from which we learn nothing. ~Henry Ford",
    "Energy and initiative count as much as talent and luck. ~Will Peters",
    "Your worth consists in what you are and not in what you have. ~Thomas Edison",
    "Determination, motivation, and dedication are what you need for inspiration. ~Danielle Duckery, Words For The Occasion",
    "All wounds heal with time. ~Tahiri Veila , Star War Quotes",
    "No one is useless in this world who lightens the burden of it to anyone else. ~Charles Dickens",
    "We will not be remembered by our words, but by our kind deeds. ~Author Unknown",
    "The only thing that can grow is the thing you give energy to. ~Ralph Waldo Emerson",
    "Be positive! Negativity doesn't get you anywhere. ~Peter W. Murphy",
    "What have you done to inspire or help others? ~Stephanie Carroll, My Conversations with God Book 4",
    "No greater gift there is, than a generous heart. ~Yoda",
    "I enjoy every day, because I choose to. ~Tony Clark",
    "The doors of wisdom are never shut. ~Benjamin Franklin",
    "Your big opportunity may be right where you are now. ~Napoleon Hill",
    "Goals help you channel your energy into action. ~Les Brown",
    "A hero is someone who has given his or her life to something bigger than oneself. ~Joseph Campbell",
    "Positive anything is better than negative nothing. ~Elbert Hubbard",
    "When we give cheerfully and accept gratefully, everyone is blessed. ~Maya Angelou",
    "A wise man will make more opportunities than he finds. ~Francis Bacon",
    "A man's true wealth is the good he does in the world. ~Kahlil Gibran",
    "The most important thing about getting somewhere is starting right where we are. ~Bruce Barton",
  ];

  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

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
    data.append("goTo", goTo)
    data.append("germanLevel", germanLevel)
    data.append("englishLevel", englishLevel)
    addRequest(data)
    setAddModal(false)
  }

  return (
    <div className="main-page">
      <AddRequest visible={addModal} onCancel={() => setAddModal(false)} onChange={onChange} onFinish={submitAdd}/>
      <h1 className="text-center">Home</h1>
      <p className="text-center quote">{getRandomQuote()}</p>
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
  request: state?.requests?.request,
  requestLoading: state?.requests?.isLoading,
});

const mapDispatchToProps = {
  readRequest,
  addRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
