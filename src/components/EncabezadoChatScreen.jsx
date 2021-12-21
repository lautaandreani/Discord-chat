import {
  Notifications,
  Room,
  PeopleAlt,
  Search,
  Send,
  Help,
} from "@material-ui/icons";

const EncabezadoChatScreen = ({ activeChannel }) => {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {activeChannel}
        </h3>
      </div>
      <div className="chatHeader__right">
        <Notifications fontSize="large" />
        <Room fontSize="large" />
        <PeopleAlt fontSize="large" />
        <div className="chatHeader__search">
          <input type="text" placeholder="Buscar" />
          <Search />
        </div>
        <Send fontSize="large" />
        <Help fontSize="large" />
      </div>
    </div>
  );
};

export default EncabezadoChatScreen;
