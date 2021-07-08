import dynamo from '../src/dynamo/dynamo';
import inventoryService from '../src/inventory/inventory.service';

let items = {Items:[{item: 'Snickers', price: 5, position: 'T56', stock: 5}]};
let obj = {promise: jest.fn().mockImplementation(()=>{
    console.log('promise is called');
    return Promise.resolve(items);
})};
dynamo.scan = jest.fn().mockReturnValue(obj);

test('A promise is returned with the inventory in it', async ()=> {
    let returnValues;
    await inventoryService.getItems().then((arr)=>{
        console.log(arr);
        returnValues = arr;
    });
    expect(returnValues).toBe(items.Items);
});