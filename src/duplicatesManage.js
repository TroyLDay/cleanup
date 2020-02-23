//js lib supporting a macro by a similar file name
window.cleanUp={
    findElementWithText: function(elems,text) {
        var ar=Array.prototype.filter.call(elems,function (el) {
            return el.textContent === text;
        });
        if (ar.length) {
            return ar[0].parentElement.children[1].textContent.replace( /[\r\n]+/gm, "" );
        }else{
            return '';
        }
    },
    compareNames: function(name1,name2){
        var name1Arr = name1.split(' ');
        var name2Arr = name2.split(' ');
        var name1Base = name1Arr.length>2?name1Arr[0]+' '+name1Arr[name1Arr.length-1]:name1;
        var name2Base = name2Arr.length>2?name2Arr[0]+' '+name2Arr[name2Arr.length-1]:name2;
        return window.cleanUp.compareTwoStrings(name1Base,name2Base);
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