import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {act} from 'react-dom/test-utils';
import {unmountComponentAtNode} from 'react-dom';

describe('App test', () => {
    let container: any = null;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('renders console title screen', async () => {
        await act(async () => {
            render(<App/>, container);
        });
        expect(document.querySelector('.output')!.textContent)
            .toBe(`...use arrow up and down to use past commands(type "help" to get help)Are you winning son? - No dad i'm coding.`);
    });


    it('render fetched answer', async () => {
        const fakeResponse = [
            {
                "_id": "63b17f71d6c94e246c20ec48",
                "id": 1,
                "name": "BMW-hj0sj",
                "brand": "BMW",
                "year": 1993,
                "price": 817719,
                "__v": 0
            }
        ];
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeResponse)
            }));
        await act(async () => { // initial render
            render(<App/>, container);
        });
        const input = document.querySelector('input');
        input!.value = 'get id 1 0';
        await act(async () => { // that is what changes state asynchronous, that why await it and act it
            fireEvent.keyDown(input!, {code: 'Enter'}); // options with enter button required!
        });
        screen.debug(); // you should see result
        expect(document.querySelector('.output')!.textContent)
            .toContain(JSON.stringify(fakeResponse));
    });


    it('render error because query wrong', async () => {
        await act(async () => {
            render(<App/>, container);
        });
        const input = document.querySelector('input');
        input!.value = 'something';
        await act(async () => {
            fireEvent.keyDown(input!, {code: 'NumpadEnter'});
        });
        expect(document.querySelector('.output')!.textContent)
            .toContain('[error]: unknown command');
    });
});