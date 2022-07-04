import { useCallback, useEffect, useState } from "react";
import CustomTreeNode from "../tree-node";
import "./style.scss"
interface CustomTreeProps {
    data: any,
    setValue: any,
    markChecked?: any,
    checkKey?: any,
    setData?: any
    key?:any
}
 
const CustomTree: React.FunctionComponent<CustomTreeProps> = ({
    data, setValue, setData,
    //  checkKey, markChecked
}) => {

    // const [theData, setTheData] = useState(data);
    const [checkKey, setCheckKey] = useState();
    const [markChecked, setMarkChecked] = useState();
    
    const checkChecked = useCallback((data: Array<any>) => {
        for(let node of data) {
            if(node.checked){
                setValue(node.title)
                let theNodeKey : any = node.key
                setCheckKey(theNodeKey)
                setMarkChecked(node.checked)
                return node.checked
            }
            else {
                if(node.children) {
                    let isCheck : any = checkChecked(node.children);
                    if(isCheck) {
                        setMarkChecked(isCheck)
                        return isCheck
                    }
                }
                else {
                    setMarkChecked(node.checked)
                    return node.checked
                }
            }
        }
    },[setValue])
    
    useEffect(()=>{
        checkChecked(data)
    },[checkChecked, data])

    // const theMarkCheck = useMemo(()=> checkChecked(data),[checkChecked, data])
    // setMarkChecked(theMarkCheck)
    return (
        <div>
            <div className="d-tree" >
                <ul className="test-tree d-tree-container flex-column">
                    {data.map((tree: any) => (
                        <CustomTreeNode
                            data={data}
                            node={tree} 
                            setValue={setValue} 
                            checkKey = {checkKey}
                            markChecked = {markChecked}
                            setData = {setData}
                            />
                    ))}
                </ul>
            </div>
        </div>
    );
}
 
export default CustomTree;