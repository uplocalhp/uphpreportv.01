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
var y ; // dummy
var x ;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('messages');




function getInputVal(id) {
    return document.getElementById(id).value;
}

// บันทึกข้อมูลลง firebase
function saveMessage(problem, diScrip,name,room) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        Problem: problem,
        Discrip: diScrip,
        Name:name,
        Room:room,
        
        
    });
    eraseText();
}

// cloud firestore
// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();


// รับค่าจาก form contactForm
document.getElementById('contactForm').addEventListener('submit', submitForm);

//ดึงค่าจาก id 
function login() {

    var emailGet = document.getElementById('exampleDropdownFormEmail2').value;
    var passwordGet = document.getElementById('exampleDropdownFormPassword2').value;

    
    console.log(emailGet);
    console.log(passwordGet);

    firebase.auth().signInWithEmailAndPassword(emailGet, passwordGet)
        .then((user) => {
            // Signed in 
            // ...

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
        });
}

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
        document.getElementById("mainPage").style.display = "block";
        document.getElementById("formlogin").style.display = "none";
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
        document.getElementById("mainPage").style.display = "none";
        document.getElementById("formlogin").style.display = "block";
    }
});
function submitForm(e) {
    e.preventDefault();
    // รับค่าจาก html
    var problem = getInputVal('inputG');
    var diScrip = getInputVal('diScrip');
    var name = y["name"];
    var room = y["room"];
    console.log ("name ="+name);
    console.log ("room ="+room);
    saveMessage(problem, diScrip,name,room);

}
function eraseText() {
    var a = document.getElementById("contactForm");
    a.reset();
    alert("รายงานคำร้องเรียบร้อยแล้วครับ");
    return false;
}
/*
*/

// เปิดหน้า ใน navbar
// function openPage(b) {
//     if (b == 1){
//         console.log("humgee");
//     } else if (b == 2){
//         return false;
//     } else if (b ==3){
//         return false;
//     }
// }
