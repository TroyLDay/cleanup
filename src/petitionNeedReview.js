//js lib supporting a macro by a similar file name
window.cleanUp={
    profileChecked:function(addrElem,tagElem){
        var addr=addrElem.textContent.split(', ');
        var tagText=tagElem?tagElem.textContent:'';
        var tag=false;
        var zip=false;

        if(tagText.indexOf('Macro Skip')>-1){
            return 'Macro Skip';
        }else{
            if(tagText.indexOf('Districts Confirmed Manually')>-1){
                tag=true;
            }
            if(tagText.indexOf('Districts Not Vetted')>-1){
                tag=true;
            }
            if(addr[addr.length-1].length===10) {
                zip=true;
            }
            if(tag||zip) {
                if(tagElem){
                    tagElem.style.backgroundColor=tag?'green':'white';
                }
                addrElem.style.backgroundColor=zip?'green':'white';
            }else{
                if(tagElem){
                    tagElem.style.backgroundColor='red';
                }
                addrElem.style.backgroundColor='red';
            }
            return tag||zip;
        }
    }
};