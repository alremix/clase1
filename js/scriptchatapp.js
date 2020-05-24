  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAOjJh5tLTxrrSMMcmzg10hQLHAPJInAjk",
    authDomain: "chatapp-2a11f.firebaseapp.com",
    databaseURL: "https://chatapp-2a11f.firebaseio.com",
    projectId: "chatapp-2a11f",
    storageBucket: "chatapp-2a11f.appspot.com",
    messagingSenderId: "157134947168",
    appId: "1:157134947168:web:3304e879a09e45931a5405",
    measurementId: "G-PCW5869LNL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
 
  function renderChat(doc){
    let div = document.createElement('div');
    let divc = document.createElement('div');
    let divtp = document.createElement('div');
    let divcn = document.createElement('div');
    let divbr = document.createElement('div');
    let divtd = document.createElement('div');
    let divcon = document.createElement('div');
    let divs = document.createElement('div');
    div.setAttribute('class', 'row');
    div.setAttribute('data-id', doc.id);
    divc.setAttribute('class', "content");
    divtp.setAttribute('class', "top-row");
    divcn.setAttribute('class', "chatname");
    divtd.setAttribute('class', "timedate");    
    divbr.setAttribute('class', "bottom-row");
    divcon.setAttribute('class', "contactname");
    divs.setAttribute('class', "status");

    div.appendChild(divc);
    divc.appendChild(divtp);
    divc.appendChild(divbr);    
    divtp.appendChild(divcn);
    divtp.appendChild(divtd);    
    divbr.appendChild(divcon);
    divbr.appendChild(divs);    
    //to.textContent = doc.data().message;
    //message.textContent = doc.data().message;
    divcn.textContent = doc.data().from;
    divcon.textContent = doc.data().message;
    divtd.textContent = doc.data().timestamp.toDate().toLocaleTimeString('en-US');
    divs.textContent = "1";

    document.querySelector('body').appendChild(div);
  }

  db.collection('chat').orderBy('timestamp').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
      //console.log(doc.data());
      renderChat(doc);
    });
    
  });

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tablinks').forEach(function (div) {
    div.onclick = function () {
      openTab(div.dataset.view);
    };
  });
  
});


function duplicate(){
    var str_html='';
    var deb = document.querySelector('.row').innerHTML;
    //str_html += str_html;
    console.log(deb);
    str_html += '<div class="row">';
    str_html += deb;
    str_html += '</div>';
    document.querySelector('body').innerHTML += str_html;
};

function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tabcontent");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(tabName).style.display = "block";  
  }