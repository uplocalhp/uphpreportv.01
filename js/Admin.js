// function acceptjob(targetname,targettype) {
//     if (targettype == "admin"){
//         //รับงาน
//     }
//     else if (targettype == "user"){
//         //popup
//     }
// }

var firebaseConfig = {
    apiKey: "AIzaSyAqLNgR7JUA4TAshJkgfI93vO1SzYiqTfU",
    authDomain: "uphpreport-3d36f.firebaseapp.com",
    databaseURL: "https://uphpreport-3d36f-default-rtdb.firebaseio.com",
    projectId: "uphpreport-3d36f",
    storageBucket: "uphpreport-3d36f.appspot.com",
    messagingSenderId: "66439083619",
    appId: "1:66439083619:web:bbfed1ebc7ff395d0cea56",
    measurementId: "G-ERBJ08F9PW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// cloud firestore
// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();
var IDaaa ;

// logout

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
        window.alert("error :" + error);
    });
}

// แสดง login logout
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ไม่ได้ login ซ้อน formid โชว์ formlogin
        // document.getElementById("formlogin").style.display = "none";
        // สร้างตัวแปรมารับค่า user auth สามารถระบุ เป็น eamil uid timelogin
        var uid = user.uid;
        var uemail = user.email;
        console.log(uemail);
        console.log(uid);
        //เอา uemail ไปเช็ค ใน cloud firestore
        // ...
        

        db.collection("user").where("email", "==", uemail).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var x = new Map();
                    x = doc.data();
                    // สร้างตัวแปรมารับค่า name room
                    var targetname = x["name"];
                    var targetroom = x["room"];
                    var targettype = x["type"];
                    // ส่งค่าไปแสดงที่ html id = nameshow
                    document.getElementById("nameshow").innerHTML = "คุณ : " + targetname;
                    document.getElementById("roomshow").innerHTML = "ห้อง : " + targetroom;
                    y = x  ;
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        
        
        
    } else {
        // User is signed out
        // ...
        // ไม่ได้ login ซ้อน formlogin โชว์ formid v
        // document.getElementById("mainPage").style.display = "none";
        // document.getElementById("formlogin").style.display = "block";
        // window.location.href = 'Page/index.html';
        location.href = "index.html";
    }
});
var database = firebase.database().ref().child('messages');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';

        snapshot.forEach(function(data){
            var Descr = data.val().Discrip;
            var Names= data.val().Name;
            var Rooms = data.val().Room;
            var pt = data.val().Problem;
            //idaaa = data.val().Cid;
            
          
            content += '<tr>';
            content += '<td>' + pt + '</td>';
            content += '<td>' + Descr + '</td>'; //column1
            content += '<td>' + Names + '</td>';//column2
            content += '<td>' + Rooms + '</td>';
            content += '<td>' + '<button>รับงาน</button>' + '</td>';
            content += '</tr>';
            document.getElementById("Descr").innerHTML = Descr;
                                                                               
        });
        //console.log(idaaa);
        document.getElementById("ex-table").innerHTML = content;
        
    }
});
