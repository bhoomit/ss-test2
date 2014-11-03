var file = function(path, name) {
    this.path = path;
    this.name = name;
    this.fetch = function () {
        return this.color + ' ' + this.type + ' apple';
    };
    this.getUI = function(){
    	return $("<div>file:: " + this.name + "</div>");
    }
}