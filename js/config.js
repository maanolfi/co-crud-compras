function setConfig(){
    let texts = {
        'title':'Shopping Control'
    }
    document.title = texts.title;
    document.getElementById('navTitle').innerHTML = texts.title;
}

setConfig()