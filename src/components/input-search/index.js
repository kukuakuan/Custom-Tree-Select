import './style.scss';

import { Input } from 'antd';
import PropTypes from 'prop-types'; 

const CustomSearchInput = (props) => {
    
    const { 
        name, 
        classNames, 
        rules, 
        placeholder,
        loading,
        onSearch,
        children,
        prefix,
        enterButton,
        allowClear,
    } = props;

    let overrideClassNames = ['atn-search-input-custom']

    const initArgs = () => {
        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <Input.Search
            name={ name }
            className={ overrideClassNames.join(' ') }
            enterButton={ enterButton }
            prefix={ prefix }
            rules={ rules }
            placeholder={ placeholder }
            loading={ loading }
            onSearch={ onSearch }
            allowClear = {allowClear}>
            { children }
        </Input.Search>
    )
}

CustomSearchInput.propTypes = {
    name: PropTypes.string,
    children: PropTypes.any,
    classNames: PropTypes.array,
    prefix: PropTypes.node,
    enterButton: PropTypes.node,
    rules: PropTypes.array,
    placeholder: PropTypes.string,
    loading: PropTypes.bool ,
    onSearch: PropTypes.func,
    allowClear: PropTypes.bool,
}

CustomSearchInput.defaultProps = {
    classNames: []
}

export default CustomSearchInput;
