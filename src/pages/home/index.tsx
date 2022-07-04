import "./style.scss";
import { FunctionComponent } from "react";

import CustomSelectTree from "../../components/custom-tree-select-true";
import { useCustomModal } from "../../components/custom-modal/use-modal";
import CustomModal from "../../components/custom-modal";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const testTreeData = [
    {
      key: "0",
      label: "Level 1-A",
      title: "Level 1-A",
      checked: false,
      children: [
        {
          key: "0-0",
          label: "Level 2-A",
          checked: false,
          title: "Level 2-A",
          children: [
            {
              key: "0-0-0",
              label: "Level 3-A",
              checked: false,
              title: "Level 3-A",
              children: [
                {
                  key: "0-0-0-0",
                  checked: true,
                  label: "Level 4-A",
                  title: "Level 4-A",
                },
              ],
            },
            {
              key: "0-0-1",
              label: "Level 3-A",
              checked: false,
              title: "Level 3-A",
            },
          ],
        },
      ],
    },
    {
      key: "1",
      label: "Level 1-A",
      checked: false,
      title: "Level 1-A",
    },
  ];
  const {isShowing, toggle} = useCustomModal();
  return (
    <div style={{ textAlign: "center" }}>
      <CustomSelectTree data={testTreeData} className="custom-tree" />
      <button className="button-default" onClick={toggle}>Show Modal</button>
      <CustomModal
        isShowing={isShowing}
        hide={toggle}
      />
    </div>
  );
};

export default HomePage;
