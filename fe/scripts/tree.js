var tree = function(path, name) {
    this.path = path;
    this.name = name;
    this.$dom = null;
    this.fetch = function () {
    	var url = 'http://localhost:5000/list?p=' + this.path;
    	var thisObj = this;
    	if(this.path != '/' && this.name != "root") url += "/" + this.name; 
         $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(resp){
            	$.each(resp.data, function(index, item){
            		thisObj.addObject(item);
            	});
            }
        });
    };
    this.getUI = function(){
    	var thisObj = this;
    	this.$dom = $("<div>dir:: " + this.name + "</div>");
    	this.$dom.click(function(){
    		thisObj.fetch();
    	});
    	return this.$dom
    };
    this.addObject = function(item){
    	var newObj = mg.factory.getObject(item, this.path);
    	this.$dom.append(newObj.getUI());
    }
}