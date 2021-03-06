  // Your web app's Firebase configuration
  /*var firebaseConfig = {
    apiKey: "AIzaSyAOjJh5tLTxrrSMMcmzg10hQLHAPJInAjk",
    authDomain: "chatapp-2a11f.firebaseapp.com",
    databaseURL: "https://chatapp-2a11f.firebaseio.com",
    projectId: "chatapp-2a11f",
    storageBucket: "chatapp-2a11f.appspot.com",
    messagingSenderId: "157134947168",
    appId: "1:157134947168:web:3304e879a09e45931a5405",
    measurementId: "G-PCW5869LNL"
  };
*/
  var firebaseConfig = {
    apiKey: "AIzaSyBQxF15lOBk4qejuvnw9h-4yLe48Xe20NE",
    authDomain: "chatapp-98d00.firebaseapp.com",
    databaseURL: "https://chatapp-98d00.firebaseio.com",
    projectId: "chatapp-98d00",
    storageBucket: "chatapp-98d00.appspot.com",
    messagingSenderId: "1017162347060",
    appId: "1:1017162347060:web:472317d8d5adac4e491061",
    measurementId: "G-0GYGF64HTC"
  };

  var miusuario="Alberto";

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
 
  function renderChat(doc,num){
    let div_row = document.createElement('div');
    let div_icon = document.createElement('div');
    let img = document.createElement('img');
    let div_content = document.createElement('div');
    let div_toprow = document.createElement('div');
    let div_chatname = document.createElement('div');
    let div_timedata = document.createElement('div');
    let div_bottomrow = document.createElement('div');
    let div_contactname = document.createElement('div');
    let div_status = document.createElement('div');

    div_row.setAttribute('class', "row");
    div_row.setAttribute('data-id', doc.id);

    if(doc.data().from==miusuario){
      div_row.setAttribute('data-contact', doc.data().to);
    }
    else{
      div_row.setAttribute('data-contact', doc.data().from);
    }

    div_icon.setAttribute('class', "icon");
    img.setAttribute('class',"pp");
    img.setAttribute('src',"image/pp.png");
    img.setAttribute('alt', "icono");
    div_content.setAttribute('class', "content");
    div_toprow.setAttribute('class', "top-row");
    div_chatname.setAttribute('class', "chatname");
    div_timedata.setAttribute('class', "timedata");
    div_bottomrow.setAttribute('class', "bottom-row");
    div_contactname.setAttribute('class', "contactname");
    div_status.setAttribute('class',"status");

    div_row.appendChild(div_icon);
    div_icon.appendChild(img);
    div_row.appendChild(div_content);
    div_content.appendChild(div_toprow);
    div_content.appendChild(div_bottomrow);
    div_toprow.appendChild(div_chatname)
    div_toprow.appendChild(div_timedata);
    div_bottomrow.appendChild(div_contactname)
    div_bottomrow.appendChild(div_status);

    if(doc.data().from==miusuario){
      div_chatname.textContent = doc.data().to;
    }
    else{
      div_chatname.textContent = doc.data().from;
    }    

    div_timedata.textContent = doc.data().timestamp.toDate().toLocaleTimeString('en-US');
    div_contactname.textContent = doc.data().message.slice(0,25);
    div_status.textContent = num;
    
    document.querySelector('.friendlist').appendChild(div_row);
    div_row.onclick = function(){
      showMessage(div_row.dataset.contact);
  };
  }

  db.collection('chat').orderBy('timestamp','desc').get().then((snapshot) => {
    var arrayConversaciones = {};
    snapshot.docs.forEach(doc => {
          if(doc.data().from==miusuario || doc.data().to==miusuario){
            if(doc.data().from!=miusuario){
                if(arrayConversaciones[doc.data().from]==undefined){
                    arrayConversaciones[doc.data().from]=[];
                    arrayConversaciones[doc.data().from].push(doc);
                }
                else{
                    arrayConversaciones[doc.data().from].push(doc);
                }
            }
            else if(doc.data().to!=miusuario){
                if(arrayConversaciones[doc.data().to]==undefined){
                    arrayConversaciones[doc.data().to]=[];
                    arrayConversaciones[doc.data().to].push(doc);
                }
                else{
                    arrayConversaciones[doc.data().to].push(doc);
                }
            }
        }
    });
    Object.entries(arrayConversaciones).forEach(([key, value]) => {
            renderChat(value[0],value.length);   
    });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tablinks').forEach(function (div) {
    div.onclick = function () {
      openTab(div.dataset.view);
    };
  });
  document.querySelector('.arrow').onclick = function(){
    showcontactbox();
  };
  document.querySelector('.send').onclick = function(){
        enviarmensaje(0);
    };
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

function showMessage(contact){
  var contactbox =  document.querySelector('.contactbox');
  var messagebox =  document.querySelector('.messagebox');
  var back =  document.querySelector('.arrow');
  contactbox.style.display = 'none';
  messagebox.style.display = 'block';
  
  getMessage(contact);
  let nombrechat = "";
  let btnsend = "";
  btnsend = document.querySelector('.send');
  btnsend.setAttribute('data-contact', contact);

  nombrechat = document.querySelector('.contacto');
  nombrechat.textContent = contact;
  console.log(nombrechat);
}

function showcontactbox(){
  var contactbox =  document.querySelector('.contactbox');
  var messagebox =  document.querySelector('.messagebox');  
  contactbox.style.display = 'block';
  messagebox.style.display = 'none';
}

function getMessage(contact){
  var chats;
  var fecha="";
  db.collection('chat').orderBy('timestamp').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
          let day=doc.data().timestamp.toDate().getDate();
          let month=doc.data().timestamp.toDate().getMonth();
          let year=doc.data().timestamp.toDate().getFullYear();
          var fechadoc=day+" - "+month+" - "+year;

          if(doc.data().from==contact && doc.data().to==miusuario){
              if(fecha != fechadoc){  
                  fecha=fechadoc;
                  document.querySelector('.chat-box').appendChild(renderFecha(fecha));
              }
              document.querySelector('.chat-box').appendChild(renderMensajeL(doc));
          }
          else if(doc.data().from==miusuario && doc.data().to==contact){
              if(fecha != fechadoc){  
                  fecha=fechadoc;
                  document.querySelector('.chat-box').appendChild(renderFecha(fecha));
              }
              document.querySelector('.chat-box').appendChild(renderMensajeR(doc));
          }
      });
  });
}

function renderFecha(fecha){
  let divfecha = document.createElement('div');
  let spanfecha = document.createElement('span');
  divfecha.setAttribute('class', "fecha");
  spanfecha.setAttribute('class', "fechaspan");

  divfecha.appendChild(spanfecha);
  spanfecha.textContent = fecha;
  return divfecha;
}

function renderMensajeR(doc){
  let divchatr = document.createElement('div');
  let divspr = document.createElement('div');
  let divmessr = document.createElement('div');
  let pr = document.createElement('p');
  let divcheckr = document.createElement('div');
  let spanr = document.createElement('span');
  let imgr = document.createElement('img');

  divchatr.setAttribute('class', "chat-r");
  divspr.setAttribute('class',"sp");
  divmessr.setAttribute('class',"mess mess-r");
  divcheckr.setAttribute('class',"check");
  imgr.setAttribute('alt',"imagen");
  imgr.setAttribute('src',"image/check-2.png");
  imgr.setAttribute('height',"20px");
  imgr.setAttribute('width',"20px");
  
  divchatr.appendChild(divspr);
  divchatr.appendChild(divmessr);
  divmessr.appendChild(pr);
  divmessr.appendChild(divcheckr);
  divcheckr.appendChild(spanr);
  divcheckr.appendChild(imgr);

  pr.textContent = doc.data().message;
  spanr.textContent = doc.data().timestamp.toDate().getHours()+" : "+doc.data().timestamp.toDate().getMinutes();

  return divchatr;
}

function renderMensajeL(doc){
  let divchatl = document.createElement('div');
  let divmessl = document.createElement('div');
  let pl = document.createElement('p');
  let divcheckl = document.createElement('div');
  let spanl = document.createElement('span');
  let divspl = document.createElement('div');

  divchatl.setAttribute('class', "chat-l");
  divmessl.setAttribute('class',"mess");
  divcheckl.setAttribute('class',"check");
  divspl.setAttribute('class',"sp");
    
  divchatl.appendChild(divmessl);
  divmessl.appendChild(pl);
  divmessl.appendChild(divcheckl);
  divcheckl.appendChild(spanl);
  divchatl.appendChild(divspl);

  pl.textContent = doc.data().message;
  spanl.textContent = doc.data().timestamp.toDate().getHours()+" : "+doc.data().timestamp.toDate().getMinutes();

  return divchatl;
}

function enviarmensaje(id){
  let msg = document.getElementById("mandar").value;
  let today = new Date();

  let btnsend = "";
  btnsend = document.querySelector('.send');

  if(id==0){
      db.collection("chat").doc().set({
          from: miusuario,
          to: btnsend.getAttribute("data-contact"),
          timestamp: today,
          message: msg
      })
      .then(function() {
          console.log("Write ok");
      })
      .catch(function(error) {
          console.error("Error writing", error);
      });
  }
  else{
      db.collection("chat").doc(id).set({
          from: miusuario,
          to: btnsend.getAttribute("data-contact"),
          message: msg,
          timestamp: today
      })
      .then(function() {
          document.querySelectorAll('.send').forEach(function (div){
              div.onclick = function(){
                  enviarmensaje(0);
              };
          });
          var divrowelimando = document.getElementById("mensaje"+id);
          divrowelimando.style.display="none";
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  }
  db.collection("chat").where("timestamp", "==", today).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          newm = renderMensajeR(doc);
          document.querySelector('.chat-box').appendChild(newm);
          var mensaje = document.getElementById('mandar');
          mensaje.value = "";
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}
