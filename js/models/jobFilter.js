class JobFilter extends Backbone.Model {
    get defaults() {
        return {
            from: "",
            to: "",
            last: 30,
            finishedOnly: false,
            notFinishedOnly: false,
            keyword: ""
        }
    }

    initialize() {
        const filterStr = localStorage.getItem("filter");
        if (filterStr) {
            const filter = JSON.parse(filterStr);
            this.set(filter);
        }
        this.listenTo(this, "change", this.save);
    }

    save() {
        localStorage.setItem("filter", JSON.stringify(this));
    }

}
;


export default JobFilter;