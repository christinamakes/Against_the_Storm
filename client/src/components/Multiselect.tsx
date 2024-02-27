import React from 'react'
import Select from 'react-select'

const customStyles = {
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isFocused ? "white" : "grey",
        backgroundColor: state.isFocused ? "#a0a0a0" : "#212529",
    }),


    control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "#212529",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};

const ResourceMultiselect = (props: any) => (
    <Select
        {...props}
        styles={customStyles}
        className="react-resource-select"
        classNamePrefix="resource-select"
        isMulti
        autoFocus
        isSearchable
        placeholder='Select resources'
        noOptionsMessage={({ inputValue }) => `No result found for "${inputValue}"`} />
);

export default ResourceMultiselect;