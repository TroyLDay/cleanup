//js lib supporting a macro by a similar file name
window.cleanUp.extractPOBox=function(a1,z){
    var ad1=a1.value.split(' ');
    var hyphen=z.length?'-':'';
    var pb = '';
    if(ad1[0]==='PO'&&ad1[1]==='Box'){
        pb=z.value.substring(0,5)+hyphen+ad1[2].padStart(4, '0');
    }
    return pb;
};