export namespace main {
	
	export class AppState {
	    filepath: string;
	    firstLoad: boolean;
	    srConfigs: {[key: string]: boolean};
	
	    static createFrom(source: any = {}) {
	        return new AppState(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.filepath = source["filepath"];
	        this.firstLoad = source["firstLoad"];
	        this.srConfigs = source["srConfigs"];
	    }
	}

}

