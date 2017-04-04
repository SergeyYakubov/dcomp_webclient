import JobInfo from '../models/job';

class JobInfos extends Backbone.Collection {
    
    get url(){
        return "/jobs/";
    }
    
    get model() {
        return JobInfo;
    }

}
;
export default JobInfos;