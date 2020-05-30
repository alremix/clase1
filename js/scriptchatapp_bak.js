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
  contactbox.style.display = 'none';
  messagebox.style.display = 'block';

  getMessage(contact);
  let nombrechat = "";
  let btnsend = "";
  /*btnsend = document.querySelector('.send');
  btnsend.setAttribute('data-contact', contact);*/

  nombrechat = document.querySelector('.contacto');
  nombrechat.textContent = contact;
  console.log(nombrechat);
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
                  document.querySelector('.rowc').appendChild(renderFecha(fecha));
              }
              document.querySelector('.rowc').appendChild(renderMensajeR(doc));
          }
          else if(doc.data().from==miusuario && doc.data().to==contact){
              if(fecha != fechadoc){  
                  fecha=fechadoc;
                  document.querySelector('.rowc').appendChild(renderFecha(fecha));
              }
              document.querySelector('.rowc').appendChild(renderMensajeE(doc));
          }
      });
  });
}

function renderFecha(fecha){
  let divrow1 = document.createElement('div');
  let divfecha = document.createElement('div');
  
  divrow1.setAttribute('class', "row1");
  divfecha.setAttribute('class', "fecha");

  divrow1.appendChild(divfecha);

  divfecha.textContent = fecha;

  return divrow1;
}

function renderMensajeR(doc){
  let divrow2 = document.createElement('div');
  let divmensajeremitente = document.createElement('div');
  let divmensaje = document.createElement('div');
  let divhora = document.createElement('div');

  divrow2.setAttribute('class', "row2");
  divmensajeremitente.setAttribute('class', "mensajeremitente");
  divmensaje.setAttribute('class', "mensaje");
  divhora.setAttribute('class', "hora");

  divrow2.appendChild(divmensajeremitente);
  divmensajeremitente.appendChild(divmensaje);
  divmensajeremitente.appendChild(divhora);

  divmensaje.textContent = doc.data().message;
  divhora.textContent = doc.data().timestamp.toDate().getHours()+" : "+doc.data().timestamp.toDate().getMinutes();

  /*divmensajeremitente.onclick = function(){
      deletemensaje(divrow2, doc.id);
  };*/

  return divrow2;
}

function renderMensajeE(doc){
  let divrow3 = document.createElement('div');
  let divmensajeemisor = document.createElement('div');
  let divmensaje = document.createElement('div');
  let divhora = document.createElement('div');
  let iconoeditar = document.createElement('i');
  let iconoeliminar = document.createElement('i');

  divrow3.setAttribute('class', "row3");
  divmensajeemisor.setAttribute('class', "mensajeemisor");
  divrow3.setAttribute('id', "mensaje"+doc.id);
  divmensaje.setAttribute('class', "mensaje");
  divhora.setAttribute('class', "hora");
  iconoeditar.setAttribute('class', "glyphicon glyphicon-pencil");
  iconoeditar.setAttribute('id', "editarmensaje");
  iconoeliminar.setAttribute('class', "glyphicon glyphicon-trash");
  iconoeliminar.setAttribute('id', "editarmensaje");

  divrow3.appendChild(divmensajeemisor);
  divmensajeemisor.appendChild(divmensaje);
  divmensajeemisor.appendChild(divhora);
  divmensajeemisor.appendChild(iconoeditar);

  divmensaje.textContent = doc.data().message;
  divhora.textContent = doc.data().timestamp.toDate().getHours()+" : "+doc.data().timestamp.toDate().getMinutes();
  
  iconoeditar.onclick = function(){
      editarmensaje(doc.data().message, doc.id);
  }

  iconoeliminar.onclick = function(){
      deletemensaje(divrow3, doc.id);
  }

  divmensajeemisor.appendChild(iconoeditar);
  divmensajeemisor.appendChild(iconoeliminar);

  /*divmensajeemisor.onclick = function(){
      deletemensaje(divrow3, doc.id);
  };*/

  return divrow3;
}
