import React from 'react'
import Select from 'react-select'

const customStyles = {
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isSelected ? "#212529" : "#fff",
        backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    }),


    control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "#212529",
        padding: "10px",
        border: "none",
        boxShadow: "none",
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