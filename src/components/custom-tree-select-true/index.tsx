import './style.scss';
import { Dropdown, Input, Space } from "antd";
import { useCallback, useEffect, useState } from "react";
import CustomTreeView from "./treeview";
import {
    DownOutlined,
    UpOutlined
} from "@ant-design/icons";
interface CustomSelectTreeProps {
    className?: any,
    data?: Array<any>,
}
 
const CustomSelectTree: React.FunctionComponent<CustomSelectTreeProps> = (props) => {
    const {
        className,
        data,
    } = props;

    let overrideClassNames = ['custom-tree']
    const initArgs = () => {
        overrideClassNames = overrideClassNames.concat(className)
    }
    initArgs();

    const [checkClick,setCheckClick] = useState(false);
    const [visible, setVisible] = useState(false);

    const onClickDropdown = () => {
        // e.preventDefault()
        setVisible(!visible)
        setCheckClick(!checkClick)
    }

    const [value, setValue] = useState('');
    const [treeData, setTreeData] = useState(data);
    const [checkedKey, setCheckedKey] = useState();
    const [markChecked, setMarkChecked] = useState(false);

    const checkChecked = useCallback((data: Array<any>) => {
        for(const node of data) {
            if(node.checked){
                setValue(node.title)
                setCheckedKey(node.key)
                setMarkChecked(node.checked)
                return node.checked
            }
            else {
                if(node.children) {
                    let isCheck : any = checkChecked(node.children);
                    if(isCheck) {
                        return isCheck
                    }
                }
                else {
                    setValue("")
                    return node.checked
                }
            }
        }
    },[])
    

    useEffect(() => {
        checkChecked(treeData as Array<any>)
    },[checkChecked, treeData])

    

    return (
        <div className = {overrideClassNames.join(' ') + `${className}`}
        style={{padding: "50px"}}
            >
            <Dropdown overlay={
                <CustomTreeView
                    theData={treeData}
                    data={treeData}
                    setTreeData = {setTreeData}
                    checkKey={checkedKey}
                    markChecked={markChecked}
                />
                }
                visible={visible}
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
 
export default CustomSelectTree;