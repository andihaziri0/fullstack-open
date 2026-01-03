const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null;
  }



  const success = {
    color: isSuccess ? 'green' : 'red',
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={success}>{message}</div>;
};

export default Notification;
