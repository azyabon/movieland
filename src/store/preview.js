import { makeAutoObservable } from "mobx";

class Preview {
    preview = {};
    constructor() {
        makeAutoObservable(this);
    }

    savePreview(movies) {
        this.preview = movies;
    }
}

export default new Preview();