//js lib supporting a macro by a similar file name
window.cleanUp={
    addTag:function(tagValue){
        var opt = document.createElement("option");
        console.log(tagValue);
        opt.value = parseeInt(tagValue);
        opt.text = 'whatever';
        opt.selected = true;
        var select = document.querySelector('#person_tags_data_tags');
        select.add(opt,null);
        select.options[select.options.length-1].selected = true;
    }
};