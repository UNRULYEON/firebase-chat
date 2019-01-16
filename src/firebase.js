import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCggu5I2-AIzaSyCPsfu9wR2IpPqofhpPbSXxXLglibxu",
    authDomain: "fir-chat-895c7.firebaseapp.com",
    databaseURL: "https://fir-chat-895c7.firebaseio.com",
    projectId: "fir-chat-895c7",
    storageBucket: "fir-chat-895c7.appspot.com",
    messagingSenderId: "1099430499281"
};

firebase.initializeApp(config);

export default firebase;