import React from 'react';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux'
import {store} from '../../reducers/store'
import ControlPanelContainer from "../../Components/ControlPanel/ControlPanelContainer";

function mock() {
    return null;
}

describe("Test to check if the correct amount of button sliders are created, and rendered", () => {
    test("Grabs all buttons with slider role in an array, and check each for render, and count them", () => {
        let counter = 0;
        const controlpanel = render(<Provider store={store}>(<ControlPanelContainer mobile={false}
                                                                                    refresh={mock}/></Provider>);
        const test = controlpanel.getAllByRole("slider");
        for (let entry of test) {
            expect(entry).toBeInTheDocument()
            counter++;
        }
        //Expect 4 button sliders
        expect(counter).toEqual(4)
    });
})