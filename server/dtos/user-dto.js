module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.username = model.username;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}