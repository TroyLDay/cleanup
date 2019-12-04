//js lib supporting a macro by a similar file name
window.cleanUp={
    getState:function(i,kind){
        return [
            'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
        ].findIndex(function(j){return j===i})+1;
    }
};