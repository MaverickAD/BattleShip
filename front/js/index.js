
if(document.cookie === ''){ // Si la session n'est pas lancée
    Connection.init();
}else{
    Logout.init();
}


