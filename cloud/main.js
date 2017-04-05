
Parse.Cloud.define("createConnectedAccount", function(request, response) {

    var stripe = require('stripe')('YOUR_SECRET_KEY');

    stripe.accounts.create({
        managed: false,
        country: 'US',
        email: 'example@gmail.com' //THIS IS YOUR THIRD PARTY ACCOUNT EMAIL ADDRESS

}, function(err, account) {
        // asynchronously called
        if (err) {
            //other errror
             response.error(err); // return error
        } else {
            //no error
             response.success(account); // return charge success
        }
    });
});

Parse.Cloud.define("charge", function(request, response) {

    var stripe = require('stripe')('YOUR_SECRET_KEY');

    stripe.charges.create({

        amount: 100, //in CENTS
        currency: "usd",
        customer: request.params.customer, //customer is the id given by stripe when you create a customer. example: cus_EXAMPLE398FMFJKEP876 
        description: "example for people",
        application_fee: 25, //again, in CENTS

        }, {stripe_account: "3RD_PARTY_ACCOUNT_NUMBER"}, function(err, charge) { //the third party account number looks something like this acct_EXAMPLE352JFLE3207ME and can be found by clicking "Connected Accounts" (left side pane option after you set it up).
        // asynchronously called
        if (err && err.type === 'StripeCardError') {
            // The card has been declined
             response.error(err); // card declineded
        } else if (err) {
            //other errror
             response.error(err); // return error
        } else {
            //no error
             response.success(charge); // return charge success
        }  
    });
});
