import "./style.scss";
import CustomTreeNode from "../treenode";
import { useEffect, useState } from "react";

interface CustomTreeViewProps {
  data?: Array<any>;
  theData?: Array<any>;
  setTreeData?: any;
  setValue?: any;
  checkKey?: any;
  markChecked?: boolean;
  setVisible?: any;
}

const CustomTreeView: React.FunctionComponent<CustomTreeViewProps> = (
  props
) => {
  const { theData, data, setTreeData, checkKey, markChecked} =
    props;

  const getTreeNode = (data: Array<any>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let nodes = [];
        for (let node of data) {
          nodes.push(node);
        }
        resolve(nodes);
      }, 500);
    });
  };

  const [dataNode, setDataNode] = useState([]);
  useEffect(() => {
    getTreeNode(data as Array<any>).then((result: any) => {
      setDataNode(result);
    });
  }, [data]);
  return (
    <div>
      <div className="d-tree">
        <ul className="test-tree d-tree-container flex-column">
          {dataNode?.map((tree: any) => (
            <CustomTreeNode
              theData={theData}
              node={tree}
              checkKey={checkKey}
              markChecked={markChecked}
              setTreeData={setTreeData}
              key={tree.key}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomTreeView;
