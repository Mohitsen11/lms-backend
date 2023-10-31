import { Schema , model } from 'mongoose';

const paymentSchema = new Schema({
    payment_id : {
        type : String,
        require : true
    },

    payment_signature : {
        type : String,
        require : true
    },

    subscription_id : {
        type : String,
        require: true
    }
},{
    timestamps : true
});

const Payment = model('Payment' , paymentSchema);

export default Payment;