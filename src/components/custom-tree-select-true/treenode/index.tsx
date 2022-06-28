import "./style.scss";
import { useCallback, useState } from "react";
import CustomTreeView from "../treeview";
import { DownOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";
interface CustomTreeNodeProps {
  theData?: Array<any>;
  data?: any;
  node?: any;
  checkKey?: any;
  markChecked?: any;
  setTreeData?: any;
  key?: any;
  setVisible?: any;
}

const CustomTreeNode: React.FunctionComponent<CustomTreeNodeProps> = (
  props
) => {
  const { theData, node, checkKey, markChecked, setTreeData } = props;

  const [childVisible, setChildVisible] = useState(false);
  const hasChild = node.children ? true : false;

  const onClickChild = useCallback(() => {
    setChildVisible(!childVisible);
  }, [childVisible, setChildVisible]);

  const find = useCallback((data: any, key: any): any => {
    if (data) {
      const dataLength = data.length;
      var i = 0;
      var result = null;
      for (i = 0; result == null && i < dataLength; i++) {
        if (data[i].key === key) {
          return data[i];
        } else {
          if (data[i].children) {
            result = find(data[i].children, key);
          }
        }
      }
      return result;
    }
  }, []);

  const onSetNodeCheck = useCallback(
    (checkKey: any, value: any) => {
      if (theData) {
        const keyNeedToBeChange = find(theData, checkKey);
        keyNeedToBeChange.checked = value;
        let dataValue = JSON.parse(JSON.stringify(theData));
        setTreeData(dataValue);
      }
    },
    [theData, find, setTreeData]
  );

  const onSetDoubleNodeCheck = useCallback(
    (checkKey: any, nodeKey: any, valueCheck: any, valueNode: any) => {
      if (theData) {
        const keyNeedToBeChange = find(theData, checkKey);
        const nodeKeyNeedToBeChange = find(theData, nodeKey);
        keyNeedToBeChange.checked = valueCheck;
        nodeKeyNeedToBeChange.checked = valueNode;
        let dataValue = JSON.parse(JSON.stringify(theData));
        setTreeData(dataValue);
      }
    },
    [theData, find, setTreeData]
  );

  const onClickLabel = useCallback(
    (node: any) => {
      if (markChecked) {
        if (node.key === checkKey) {
          onSetNodeCheck(node.key, false);
        } else {
          onSetDoubleNodeCheck(checkKey, node.key, false, true);
        }
      } else {
        onSetNodeCheck(node.key, true);
      }
    },
    [checkKey, markChecked, onSetDoubleNodeCheck, onSetNodeCheck]
  );
  return (
    <div>
      <li className="d-tree-node">
        <div
          className="d-flex"
          style={{
            backgroundColor: node.checked ? "#E2E2E2" : "rgb(239, 239, 239)",
          }}
        >
          {hasChild && (
            <div
              className={`d-inline d-tree-toggle ${
                childVisible ? "active" : "inactive"
              }`}
              onClick={() => onClickChild()}
            >
              {childVisible ? <DownOutlined /> : <RightOutlined />}
            </div>
          )}
          <div
            className="test-col d-tree-head"
            onClick={() => onClickLabel(node)}
          >
            {node.title}
            {node.checked ? <CheckOutlined /> : null}
          </div>
        </div>

        {hasChild && childVisible && (
          <div className="d-tree-content">
            <ul className="d-tree-container flex-column">
              <CustomTreeView
                theData={theData}
                data={node.children}
                setTreeData={setTreeData}
                checkKey={checkKey}
                markChecked={markChecked}
              />
            </ul>
          </div>
        )}
      </li>
    </div>
  );
};

export default CustomTreeNode;
