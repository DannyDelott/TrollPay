
var PaymentStore = {
  payment: null,
  sender: null,
  //function to send data to server
  sendData: function(cb) {
    $.post('/payment/create', this.payment, function(data) {
      console.log('paymentStore recieved the data ' + JSON.stringify(data));
      //overwrite this.sender with data recieved back from server
      //UX GOAL: Once the user hits confirm, they reach a confirmation page where they can see their picture,

      this.payment = {
        total: data.payment.total,
        recipient_email: data.payment.recipient_email,
        note: data.payment.note
      };

      this.sender = {
        first_name: data.first_name,
        last_name: data.last_name,
        profile_pic: data.profile_pic,
        email: data.email
      }
      cb();
    });

  },
  getAll: function() {
    return this.payments;
  },
  putOne: function(inputs) {
    // TODO: validate inputs, then store in localStorage;
    var inputs = Array.prototype.slice.call(inputs);
    inputs.forEach(function(input) {
      if (input.value) {
        if (window.localStorage) {
          localStorage.setItem(input.name, input.value);
        }
        input.value = '';
      }
    }.bind(this));
  }
};


MicroEvent.mixin(PaymentStore);
