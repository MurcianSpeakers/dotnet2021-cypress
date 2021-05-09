import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import './petSelector.css';
export interface IPetSelectorProps {
    value: "cat" | "dog";
    onChange: (value: "cat" | "dog") => void;
}

export const PetSelector = ({ value, onChange }: IPetSelectorProps): ReactElement => {
    const [_value, setValue] = useState(value);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const _onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const eventValue = event.target.value as "cat" | "dog";
        setValue(eventValue);
        onChange(eventValue);
    }
    return <div className="myapp-pet-selector">
        <div className="form-check">
            <input className="form-check-input" type="radio" id="cat" name="pet" value="cat" checked={_value === "cat"} onChange={_onChange} />
            <label className="form-check-label" htmlFor="cat">Cat</label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="radio" id="dog" name="pet" value="dog" checked={_value === "dog"} onChange={_onChange} />
            <label className="form-check-label" htmlFor="dog">Dog</label>
        </div>
    </div>;
}