export default class UsersMemory {
    constructor() {
        this.users = [];
    }

    async get() {
        return this.users;
    }

    async create(user) {
        this.users.push(user);
        return user;
    }

    async findById(id) {
        return this.users.find(user => user.id === id);
    }

    async update(id, updateUser) {
        let index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updateUser };
            return this.users[index];
        }
        return null;
    }

    async delete(id) {
        let index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            let [deletedUser] = this.users.splice(index, 1);
            return deletedUser;
        }
        return null;
    }
}
