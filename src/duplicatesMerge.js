//js lib supporting a macro by a similar file name
window.cleanUp={
    selectAttributes:function(newerID,olderID,recencyBias){
        var newerRadio = document.querySelectorAll('input[value="'+newerID+'"][type="radio"]');
        var newerTags = document.querySelector('#merge_options_tags_'+newerID);
        newerTags = newerTags?newerTags.parentElement.parentElement.textContent:'';
        var enumMap = {
            support_type: {
                is_prospect: 1,
                is_supporter: 2,
                none_support_type: 3
            },
            sex: {
                none_sex: 1,
                female: 2,
                male: 2
            }
        };
        Array.prototype.forEach.call(newerRadio, function (node) {
            var idArray=node.id.split('_');
            idArray.shift();idArray.shift();idArray.pop();
            var id = idArray.join('_');
            var olderRadio = document.querySelector('#merge_options_'+id+'_'+olderID);
            var newerValue = node.parentElement.parentElement.textContent.trim();
            var olderValue = olderRadio.parentElement.parentElement.textContent.trim();
            switch (id) {
                case 'nationbuilder_id':
                    if(Number.parseInt(newerValue) > Number.parseInt(olderValue)) {
                        olderRadio.click();
                    }else{
                        node.click();
                    }
                    break;
                case 'support_type':
                case 'sex':
                    enumMap[id][newerValue]>enumMap[id][olderValue]?node.click():olderRadio.click();
                    break;
                case 'person_address':
                    newerValue = newerValue.toLowerCase();
                    olderValue = olderValue.toLowerCase();
                    var betterID = newerID;
                    var fuzzyAddress = window.cleanUp.compareTwoStrings(newerValue,olderValue);
                    if(fuzzyAddress>.7) {
                        if (newerValue.length >= olderValue.length) {
                            node.click();
                        } else {
                            olderRadio.click();
                            betterID = olderID;
                        }
                    } else {
                        if(olderValue.includes(newerValue)){
                            olderRadio.click();
                            betterID = olderID;
                        } else {
                            node.click();
                            betterID = id;
                        }
                    }
                    if(document.querySelector('#merge_options_lower_district_'+betterID)){
                        document.querySelector('#merge_options_lower_district_'+betterID).click();
                    }
                    if(document.querySelector('#merge_options_upper_district_'+betterID)){
                        document.querySelector('#merge_options_upper_district_'+betterID).click();
                    }
                    break;
                case 'first_name':
                    if (newerValue.includes(olderValue)) {
                        node.click();
                    } else {
                        if (olderValue.includes(newerValue)) {
                            olderRadio.click();
                        } else {
                            if (newerValue.length >= olderValue.length) {
                                node.click();
                            } else {
                                olderRadio.click();
                            }
                        }
                    }
                    break;
                case 'is_volunteer':
                case 'is_veteran':
                case 'keep_me_informed':
                case 'email_opt_in':
                case 'mobile_opt_in':
                    if (recencyBias) {
                        newerTags.includes('RNC_')?console.log('Ignore RNC Import values.'):node.click();
                    } else {
                        newerValue === 'true' ? node.click() : olderRadio.click();
                    }
                    break;
                default:
                    node.click();
            }
        });
        var newerCheckbox = document.querySelectorAll('input[type="checkbox"]');
        Array.prototype.forEach.call(newerCheckbox, function (el) {
            if (!el.checked) {
                el.click();
            }
        });
    },
    compareTwoStrings:function(first, second, threshold) {
        first = first.replace(/\s+/g, '');
        second = second.replace(/\s+/g, '');
        if (first==='#LNF' || second==='#LNF') return 0;
        if (!first.length && !second.length) return 0;
        if (!first.length || !second.length) return 0;
        if (first === second) return 1;
        if (first.length === 1 && second.length === 1) return 0;
        if (first.length < 2 || second.length < 2) return 0;
        let firstBigrams = new Map();
        for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram) + 1
                : 1;

            firstBigrams.set(bigram, count);
        }
        let intersectionSize = 0;
        for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);
            const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }
        return (2.0 * intersectionSize) / (first.length + second.length - 2);
    }
}