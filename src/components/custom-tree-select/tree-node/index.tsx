import './style.scss';
import { useCallback, useState } from "react";
import CustomTree from "../tree";
import {
    DownOutlined,
    RightOutlined,
    CheckOutlined
} from "@ant-design/icons";
import LazyLoad from 'react-lazyload'

interface CustomTreeNodeProps {
    data: any,
    node?: any,
    setValue?: any,
    checkKey?: any,
    markChecked?: any,
    setData?: any,
    key?: any
}
 
const CustomTreeNode: React.FunctionComponent<CustomTreeNodeProps> = (props) => {
    const {
        data,
        node, 
        setValue, 
        checkKey, 
        markChecked, 
        setData,
    } = props

    // const [needRender, setNeedRender] = useState(false);
    const [childVisible, setChildVisible] = useState(false);
    const [arrow,setArrow] = useState(false);
    // const [select, setSelect] = useState(false);
    const hasChild = node.children ? true : false;

    const onClickChild = useCallback(() => {
        setChildVisible(!childVisible)
        setArrow(!arrow)
    },[arrow, childVisible, setChildVisible, setArrow])

    const find = useCallback((data: any, key: any) : any => {
        if(data) {
            const dataLength = data.length
            var i = 0;
            var result = null;
            for(i=0;result == null && i<dataLength; i++) {
                if(data[i].key === key) {
                    return data[i]
                }
                else {
                    if(data[i].children) {
                        result = find(data[i].children, key)
                    }
                }
            }
            return result;
        }
    }, []);


    const onSetNodeCheck = useCallback((checkKey: any, value: any)=> {
        // console.log(data)
        // const dataValue = JSON.parse(JSON.stringify(data))
        if(data) {
            const keyNeedToBeChange = find(data, checkKey)
            keyNeedToBeChange.checked = value;
            let dataValue = JSON.parse(JSON.stringify(data))
            setData(dataValue)
            console.log(dataValue)
        }
    }, [data, find, setData])


    const onSetDoubleNodeCheck = useCallback((checkKey: any,nodeKey: any, valueCheck: any, valueNode: any)=> {
        // console.log(data)
        // const dataValue = JSON.parse(JSON.stringify(data))
        if(data) {
            const keyNeedToBeChange = find(data, checkKey)
            const nodeKeyNeedToBeChange = find(data, nodeKey)
            keyNeedToBeChange.checked = valueCheck;
            nodeKeyNeedToBeChange.checked = valueNode;
            // let dataValue = JSON.parse(JSON.stringify(data))
            let dataValue: any = data
            setData(dataValue)
            console.log(dataValue)
        }
    }, [data, find, setData])

    const onClickLabel = useCallback((
            node: { key: any; checked: boolean; title: string }, 
            markChecked: any, 
            checkKey: any
        )=> {
            console.log(markChecked)
            console.log(checkKey)

        if(markChecked){
            if(node.key === checkKey){
                setValue('')
                onSetNodeCheck(node.key,false)
            }
            else {
                setValue(node.title)
                // onSetNodeCheck(node.key,true)
                // onSetNodeCheck(checkKey,false)
                onSetDoubleNodeCheck(checkKey, node.key, false, true)
            }
        }
        else {
            setValue(node.title)
            onSetNodeCheck(node.key,true)
        }
    }, [onSetDoubleNodeCheck, onSetNodeCheck, setValue])


    return (
        <li className="d-tree-node">
            <div className="d-flex"
                style={{
                    backgroundColor: node.checked ? "#E2E2E2" : "null"
                }}
                >
                {hasChild &&  (
                    <div className={`d-inline d-tree-toggle ${childVisible ? 'active' : 'inactive'}`}
                        onClick={() => onClickChild()}
                        >
                        {arrow ? <DownOutlined/> : <RightOutlined/>}
                    </div>
                )}
                <div className='test-col d-tree-head' 
                    onClick={()=>onClickLabel(node, markChecked, checkKey)}
                    
                > 
                    {node.title}
                    {node.checked ? <CheckOutlined/> : null}
                </div>
            </div>

            {
                hasChild && childVisible && <div className='d-tree-content'>
                    <ul className='d-tree-container flex-column'>
                        <LazyLoad>
                        <CustomTree data={node.children}
                            setValue={setValue}
                        />
                        </LazyLoad>
                    </ul>
                </div>
            }
        </li>
    );
}
 
export default CustomTreeNode;