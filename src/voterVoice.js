//js lib supporting a macro by a similar file name
window.cleanUp={
    updateProfile:function(){
        let xhr = new XMLHttpRequest();
        let url = '/handlers_api/people/1117424/info';
        xhr.open("GET", url, true);
        xhr.onload = function (e) {
            console.log('onload');
            if (xhr.readyState === 4) {
                console.log('readState 4');
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
        return true;
    }
};