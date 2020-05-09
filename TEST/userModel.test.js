const  users  = require('../data/userModel.js');

describe('Users Model', () => {
  describe.skip('getUsers()', () => {
    it('should return an array of objects', async () => {
      const getUsersMock = jest.spyOn(users, 'getUsers');
      const userList = getUsersMock();
      expect(userList).not.toBeNull();
      expect(userList).not.toBeUndefined();
    });
  });
  describe('findById', () => {
    it('should return a user with a valid id', async () => {
      const user = await users.findById(202);
      expect(user).not.toBeNull();
      expect(user).toEqual(expect.objectContaining({ username: 'md1' }));
    });
  });
  describe('addUser', () => {
    it('should add a user to the db', async () => {
      const userList = await users.find();
      await users.addUser({
        username: `faketestuser${userList.length}`,
        password: 'faketestpw',
        email: `faketest@email${userList.length}`,
        phone: `098423${userList.length}`
      });
      const updatedList = await users.find();
      expect(updatedList.length).toBe(userList.length + 1);
    });
  })
  describe('updateUser()', () => {
    it('should update a user', async () => {
      const changes = { username: 'update' }
      await users.update(203, changes)
      const updatedList = await users.findById(203);
      expect(updatedList.username).toBe('update')

    });
  });
})