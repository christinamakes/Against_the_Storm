import Select from 'react-select'

const customStyles = {
    option: (defaultStyles: any, state: any) => ({
        ...defaultStyles,
        color: state.isFocused ? "white" : "grey",
        backgroundColor: state.isFocused ? "#a0a0a0" : "white",
    }),

    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
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