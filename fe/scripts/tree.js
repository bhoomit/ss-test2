var tree = function(path, name) {
    this.path = path;
    this.fetched = false;
    this.padding = path.replace(/[^a]/g, "").length + 1;
    this.name = name;
    this.$dom = null;
    this.fetch = function () {
        this.$dom.toggleClass('expanded');
        if(this.fetched) return;
    	var url = 'http://skyscanner-test-161452.euw1.nitrousbox.com:5000/list?p=' + this.path;
    	var thisObj = this;
    	if(this.path != '/' || this.name != "root") url += "/" + this.name; 
         $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(resp){
                if(typeof resp.data != 'undefined' && resp.data.length > 0)
            	$.each(resp.data, function(index, item){
            		thisObj.addObject(item);
            	});
            }
        });
    };
    this.getUI = function(){
    	var thisObj = this;
    	this.$dom = $("<div class='directory' style='padding-left:" + this.padding * 10 + "px;'>dir:: " + this.name + "</div>");
    	this.$dom.click(function(){
    		setTimeout(function(){
                thisObj.fetch();
            },500);
    	});
    	return this.$dom
    };
    this.addObject = function(item){
    	var newObj = mg.factory.getObject(item, this.path);
    	this.$dom.append(newObj.getUI());
    }
}