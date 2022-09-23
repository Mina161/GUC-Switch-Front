import { Button, Card, Tooltip } from "antd";
import React from "react";
import { connect } from "react-redux";
import { contactMatch } from "../../store/actions/matchActions";
import { BiMailSend } from "react-icons/bi";

export const SingleMatch = ({
  match,
  user,
  userRequest,
  contactMatch,
}) => {
  const contactedBefore =
    userRequest?.contacted && userRequest?.contacted?.includes(match.appNo);
  return (
    <div className="col-md-6 p-2">
      <Card>
        <div>
          <h2>ID: {match.appNo}</h2>
          <p>Tutorial Number: {match.tutNo}</p>
          <p>German Level: {match.germanLevel}</p>
          <p>English Level: {match.englishLevel}</p>
          <div className="text-center">
            <Tooltip title={contactedBefore? "You have already contacted this person":"We will send them an email so you don't have to worry"}>
              <Button
                disabled={
                    contactedBefore
                }
                onClick={() =>
                  contactMatch(
                    { sender: user?.appNo, receiver: match.appNo }
                  )
                }
              >
                Contact <BiMailSend/>
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state?.auth?.user,
  userRequest: state?.requests?.request,
});

const mapDispatchToProps = { contactMatch };

export default connect(mapStateToProps, mapDispatchToProps)(SingleMatch);
