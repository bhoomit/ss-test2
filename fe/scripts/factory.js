if(typeof mg == 'undefined'){
	mg = {};
}
mg.factory = new function() {
    this.getObject = function (item, path) {
	    switch(item[1]) {
			case "dir":
			    return new tree(path, item[0]);
			    break;
			default:
			    return new tree(path, item.join());
		}
    };
};