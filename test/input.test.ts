import * as input from '../src/input';
import * as user from '../src/user/user';

// Problem #1: The Start() function
beforeAll( () => {
    input.start = jest.fn().mockImplementation(()=>{console.log('start is called');});
});

/*
describe('tests of displayInventory', () => {
    beforeEach(()=>{

    })
    test()
})
*/

describe('Tests of attemptLogin', () => {
    beforeEach( () => {
        // Problem #2: question() expects user input and will not continue without it. We can't give it user input.
        input.rl.question = jest.fn().mockImplementationOnce((questionText, answer) => answer("Richard"))
            .mockImplementationOnce((questionText, answer) => answer("password"));
    });

    test('That an incorrect password results in loggedUser remaining null', async () => {
        // Problem #3: test relies on login() function working correctly.
        user.login = jest.fn().mockResolvedValue(false);
        expect(input.loggedUser).toBe(undefined);
        await input.attemptLogin();
        expect(input.loggedUser).toBe(undefined);
    });
    
    test('That an correct password results in loggedUser being set', async () => {
        // Problem #3: test relies on login() function working correctly.
        user.login = jest.fn().mockImplementationOnce((one, two) => { return Promise.resolve({name: one, pass: two})});
        expect(input.loggedUser).toBe(undefined);
        await input.attemptLogin();
        expect(input.loggedUser).toStrictEqual({name: 'Richard', pass: 'password'});
    });
});