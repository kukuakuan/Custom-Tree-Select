import { FunctionComponent } from "react";
import "./style.scss"
import CustomTreeSelect from "../../components/custom-tree-select"
interface TestPageProps {
    
}
 
const TestPage: FunctionComponent<TestPageProps> = () => {
    const testTreeData = [
        {
            key:"0",
            label:"LV1",
            title:"Level 1-A",
            checked: false,
            children: [
                {
                    key:"0-0",
                    label:"LV2",
                    checked: false,
                    title:"Level 2-A",
                    children: [
                        {
                            key:"0-0-0",
                            label:"LV3",
                            checked: false,
                            title:"Level 3-A",
                            children: [
                                {
                                    key:"0-0-0-0",
                                    checked: true,
                                    label:"LV4",
                                    title:"Level 4-A",
                                }
                            ]
                        },
                        {
                            key:"0-0-1",
                            label:"LV3",
                            checked: false,
                            title:"Level 3-A",
                        }
                    ]
                }
            ]
        },
        {
            key:"1",
            label:"LV1",
            checked: false,
            title:"Level 1-A",
        }
    ]
    return ( 
        <div
            style={{textAlign: 'center'}}
        >
            <CustomTreeSelect data={testTreeData} className={"test-tree-data"}/>
        </div>
     );
}
 
export default TestPage;