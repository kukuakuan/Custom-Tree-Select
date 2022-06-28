import { Dropdown, Space, Input } from "antd";
import "./style.scss"
import CustomTree from "./tree"
import {
    DownOutlined,
    UpOutlined
} from "@ant-design/icons";
import { useMemo, useState, 
    // useCallback, useEffect 
} from "react";
// import LazyLoad from 'react-lazyload'
interface CustomTreeSelectProps {
    className?: any,
    data?: Array<any>,
}
 
const CustomTreeSelect: React.FunctionComponent<CustomTreeSelectProps> = (props) => {
    const {
        className,
        data,
    } = props;

    let overrideClassNames = ['custom-tree']
    const initArgs = () => {
        overrideClassNames = overrideClassNames.concat(className)
    }
    initArgs();
    const [theData, setTheData] = useState(data);
    const [value, setValue] = useState('');
    const [checkClick,setCheckClick] = useState(false);
    const onClickDropdown = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setCheckClick(!checkClick)
    }
    console.log(theData)

    // const [checkKey, setCheckKey] = useState();
    // const [markChecked, setMarkChecked] = useState();
    
    // const checkChecked = useCallback((data: Array<any>) => {
    //     for(let node of data) {
    //         if(node.checked){
    //             setValue(node.title)
    //             let theNodeKey : any = node.key
    //             setCheckKey(theNodeKey)
    //             return node.checked
    //         }
    //         else {
    //             if(node.children) {
    //                 let isCheck : any = checkChecked(node.children);
    //                 if(isCheck) return isCheck
    //             }
    //             else return node.checked
    //         }
    //     }
    // },[setValue])
    // useEffect(()=>{
    //     setMarkChecked(checkChecked(data))
    // },[checkChecked, data]);
    // const theMarkCheck = checkChecked(theData)
    // setMarkChecked(theMarkCheck)
    
    const renderTree = () => {
        return (
            // <LazyLoad>
                <CustomTree data={theData}
                    setValue={setValue}
                    setData = {setTheData}
                    // checkKey = {checkKey}
                    // markChecked = {markChecked}
                    />
            // </LazyLoad>
        )
    }

    return (
        <div
            className = {overrideClassNames.join(' ') + `${className}`}
            style={{padding: "50px"}}
            >
            <Dropdown overlay={renderTree}
                trigger={['click']}
                overlayStyle = {{
                    // border: "2px solid ", 
                    backgroundColor: '#EFEFEF',
                    WebkitBoxShadow: '0px 0px 25px 10px rgba(224,224,224,0.5)',
                    boxShadow: '0px 0px 25px 10px rgba(224,224,224,0.5)',
                    marginTop: '5px',
                    minWidth: '200px'
                }}
                placement={"bottom"}
            >
                <div onClick={onClickDropdown}>
                    <Space>
                        <Input disabled
                            placeholder="Your options"
                            value={value}
                            suffix={
                                !checkClick ? 
                                <DownOutlined/> : <UpOutlined/>
                            }
                        />
                    </Space>
                </div>
            </Dropdown>
        </div>
    );
}
 
export default CustomTreeSelect;