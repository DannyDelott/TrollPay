var Confirm = React.createClass({
  getInitialState: function() {
    return {
      picture: null,
      total : localStorage["total"],
      note: localStorage["note"], 
      recipient_email: localStorage["recipient_email"]
    }
  },
  componentDidMount: function() {
    UserStore.bind('change', this.credentialsRecieved);
    AppDispatcher.dispatch({
      eventName: 'get-user-credentials',
      authData: {code: url.code}
    });
  },
  credentialsRecieved: function() {
    this.forceUpdate();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var data = {
      access_token: url.code,
      recipient_email: this.state.recipient_email,
      total: this.state.total,
      note: this.state.note,
      isCancelled: false,
      created_at: new Date().toISOString(),
      balance: this.state.total,
      installments: []
    }
    AppDispatcher.dispatch({
      eventName: 'new-payment',
      newPayment: {payment: data}
    });
  },
  render: function(){
    return (
      <div>
        <div>
          <h4>Total Amount</h4>
          <p>{this.state.total}</p>
        </div>
        <div>
          <h4>Custom Note</h4>
          <p>{this.state.note}</p>
        </div>
        <div>
          <h4>Recipient email</h4>
          <p>{this.state.recipient_email}</p>
        </div> 
        <form onSubmit={this.handleSubmit}>
          <input type="submit" />
        </form>
      </div>
    );
  }
});