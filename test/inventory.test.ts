import { getByPosition, Inventory, itemString } from '../src/inventory/inventory';
import inventoryService from '../src/inventory/inventory.service';

let testItem: Inventory|undefined;

// Set up the environment before any test is run. This runs once.
beforeAll(() => {
    //console.log('before all tests');
});

// Tear down the environment after every test is run. This runs once.
afterAll(() => {
    //console.log('after all tests');
});

// Before each of my tests, set up the environment.
beforeEach(() => {
    //console.log('before each test');
    testItem = {item: 'Snickers', price: 5, position: 'T56', stock: 5};
});

// Destroy everything we created after each test.
afterEach(() => {
    //console.log('after each test');
    testItem = undefined;
});

test('That the item string works with a real object', () => {
    //console.log('snickers test');
    let str = 'T56. Snickers- $5';
    if(testItem) {
        expect(itemString(testItem)).toBe(str);
    }
});

test('That the item string works with an empty object', () => {
    //console.log('null test');
    let obj: Inventory = {item: '', position: '', stock: 0, price: 0};
    let str = '. - $0';
    expect(itemString(obj)).toBe(str);
});

describe('A situation where the item is found', () => {

    test('that success is called when the item is found', async () => {
        let success = jest.fn();
        let failure = jest.fn();
        // Mock the function by creating a new jest function that returns a promise containing the test item when called.
        inventoryService.getItemByPositionSimple = jest.fn().mockResolvedValue(testItem);
        // .mock.calls is an array of all the calls to the mocked function
        await getByPosition('', success, failure);
        expect(success.mock.calls.length).toBe(1);
    });
    test('that failure is called when the item is not found', async () => {
        let success = jest.fn();
        let failure = jest.fn();
        // Mock the function by creating a new jest function that returns a promise containing the test item when called.
        inventoryService.getItemByPositionSimple = jest.fn().mockResolvedValue(undefined);
        // .mock.calls is an array of all the calls to the mocked function
        await getByPosition('', success, failure);
        expect(failure.mock.calls.length).toBe(1);
    });
})