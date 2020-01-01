//js lib supporting a macro by a similar file name
window.cleanUp={
    /*geoChange:function(el,v){
        if(el.textContent!==v){
            el.style.backgroundColor='yellow';
        }
    },*/
    sensitize:function(els){
        els.forEach(function(el){
            var iv=el.value;
            el.oninput=function(ev){
                if(ev.target.value!==iv){
                    ev.target.style.backgroundColor='yellow';
                }else{
                    ev.target.style.backgroundColor='white';
                }
            }
        });
    },
    addChangeDetection:function(els){
        window.document.addEventListener('click',function(ev){
            if(ev.target.textContent==='Fill Fields With Result'||ev.target.textContent==='Fill Address With Result'){
                var tm=setTimeout(function(){
                    els.forEach(function(el){
                        el.dispatchEvent(new Event('input'));
                    });
                },1000);
            }
        });
    },
    standard:function(w){
        return w.charAt(0).toUpperCase()+w.substring(1);
    },
    capAfter:function(w){
        var chars=['-','#'];
        chars.forEach(function(char){
            var parts=w.split(char);
            w = parts.length>1?parts[0]+char+window.cleanUp.standard(parts[1]):w;
        });
        return w;
    },
    capAbbreviations:function(w){
        var parts=['Us-','Cr-',
            'Al-','Ak-','Az-','Ar-','Ca-','Co-','Ct-','De-','Dc-','Fl-','Ga-','Hi-','Id-','Il-','In-','Ia-','Ks-',
            'Ky-','La-','Me-','Md-','Ma-','Mi-','Mn-','Ms-','Mo-','Mt-','Ne-','Nv-','Nh-','Nj-','Nm-','Ny-','Nc-',
            'Nd-','Oh-','Ok-','Or-','Pa-','Pr-','Ri-','Sc-','Sd-','Tn-','Tx-','Ut-','Vt-','Va-','Wa-','Wv-','Wi-','Wy-'];
        parts.forEach(function(part){w=w.replace(part, part.toUpperCase());});return w;
    },
    capSelective:function(w){
        var parts=['Mac','Mc'];
        parts.forEach(function(part){
            var wp=w.split(part);
            w=wp.length>1?wp[0]+part+window.cleanUp.standard(wp[1]):w;
        });
        return w;
    },
    capitalize:function(el,comma,notSurname){
        var ad=comma?el.value.replace(/,/g,' '):el.value;
        return ad.replace('  ',' ').toLowerCase().replace(/\.(?=\D)|\.$/g,'').split(' ').reduce((a,w,i)=>{
            w=w.trim();
            if(i===0&&w==='box'){return a+'PO Box ';}
            if(w==='pobox'||w==='pob'){return a+'PO Box ';}
            var acronyms=['us','cr','po','ne','nw','se','sw','rr'];
            if(acronyms.includes(w)){return a+w.toUpperCase()+' '}
            var c=window.cleanUp.capAbbreviations(window.cleanUp.standard(w));
            c=notSurname?c:window.cleanUp.capSelective(c);
            return a+window.cleanUp.capAfter(c)+' ';
        },'').trim();
    },
    getState:function(i,kind){
        var s=['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC',
            'ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
        switch(kind){
            case 'index': return s.findIndex(function(j){
                return j===i;
            })+1;
                break;
            default:
        }
        return s[i-1];
    },
    moveApt:function(a1,a2){
        var ad2New='';
        var ad1New=a1.value.split(' ').filter(function(w,i){
            if(ad2New||w==='Apt'||w==='Unit'||w==='Lot'||w[0]==='#'||w==='Suite'||w==='Ste'||w==='Trlr'){
                ad2New+=w+' ';
                return false;
            }
            return true;
        });
        a1.value=ad1New.join(' ');
        a2.value=(a2.value+ad2New).trim();
    },
    fixCity:function(ec,ea){
        var c=ec.value.substring(0,ec.value.length-1);
        var a=ea.value;
        var i=a.indexOf(c);
        if(i>-1&&i===a.length-c.length){
            a=a.substring(0,i);
            ea.value=a;
        }
    },
    fixName:function(first,middle,last){
        var fix=false;
        var capFirst=first?window.cleanUp.standard(first.toLowerCase()):'';
        var capMiddle=middle?window.cleanUp.standard(middle.toLowerCase()):'';
        var capLast=last?window.cleanUp.standard(last.toLowerCase()):'';
        if(first!==capFirst||first.indexOf('.')>-1){
            fix=true;
        }
        if(middle&&(middle!==capMiddle||middle.indexOf('.')>-1)){
            fix=true;
        }
        if(last!==capLast||last.indexOf('.')>-1){
            fix=true;
        }

        return fix;
    }
};